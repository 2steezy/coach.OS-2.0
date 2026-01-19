// --- SMART BRAIN DATABASE ---

// 1. INJURY LOGIC (The "Filter")
const INJURY_LOGIC = {
    "hip_labrum": {
        "banned": ["Back Squat", "Deep Lunges", "Conventional Deadlift", "Pistol Squat", "Lateral Lunges"],
        "swaps": {
            "Back Squat": "Trap Bar Deadlift (High Handles)",
            "Deep Lunges": "Step Ups (Low Box)",
            "Conventional Deadlift": "RDL (Range Limited)",
            "Pistol Squat": "Glute Bridge Iso",
            "Lateral Lunges": "Forward Lunges"
        }
    },
    "knee_pain": {
        "banned": ["Deep Lunges", "Bulgarian Split Squats", "Forward Jumps", "Pistol Squat"],
        "swaps": {
            "Deep Lunges": "Reverse Lunges (Vertical Shin)",
            "Bulgarian Split Squats": "Spanish Squat Holds",
            "Forward Jumps": "Box Jumps (Soft Landing)",
            "Pistol Squat": "Wall Sit"
        }
    },
    "ankle_sprain": {
        "banned": ["Pogo Hops", "Broad Jumps", "Sprints", "Calf Raises", "Depth Drops"],
        "swaps": {
            "Pogo Hops": "Seated Calf Iso",
            "Broad Jumps": "Kb Swings",
            "Sprints": "Assault Bike",
            "Calf Raises": "Tibialis Raises (Seated)",
            "Depth Drops": "Tempo Goblet Squats"
        }
    },
    "back_pain": {
        "banned": ["Back Squat", "Conventional Deadlift", "Bent Over Row", "Overhead Press"],
        "swaps": {
            "Back Squat": "Goblet Squat",
            "Conventional Deadlift": "Chest Supported Row",
            "Bent Over Row": "Seal Row",
            "Overhead Press": "Landmine Press"
        }
    },
    "groin": {
        "banned": ["Lateral Lunges", "Sumo Deadlift", "Copenhagen Planks", "Broad Jumps"],
        "swaps": {
            "Lateral Lunges": "Forward Lunges",
            "Sumo Deadlift": "Trap Bar Deadlift",
            "Copenhagen Planks": "Front Planks",
            "Broad Jumps": "Vertical Jumps"
        }
    },
    "none": { banned: [], swaps: {} }
};

// 2. PHASE LOGIC (The "Gearbox")
const PHASES = {
    "hypertrophy": { label: "Hypertrophy", reps: "3 x 10-12", intensity: "Mod", focus: "Tissue Capacity" },
    "strength": { label: "Strength", reps: "5 x 3-5", intensity: "High", focus: "Force Production" },
    "power": { label: "Power", reps: "4 x 3", intensity: "Explosive", focus: "Velocity" },
    "in_season": { label: "In-Season", reps: "3 x 3", intensity: "Maint", focus: "Readiness" },
    "recovery": { label: "RECOVERY MODE", reps: "Duration", intensity: "Low", focus: "Mobility" }
};

// 3. BASE TEMPLATES (The "Skeleton")
const WORKOUT_TEMPLATES = {
    "Monday": { 
        name: "Lower Force", 
        base: ["Back Squat", "Broad Jumps", "Bulgarian Split Squats", "Weighted Planks"] 
    },
    "Tuesday": { 
        name: "Upper Body", 
        base: ["Bench Press", "Weighted Pull-Ups", "Overhead Press", "Face Pulls"] 
    },
    "Wednesday": { 
        name: "Movement/Mobility", 
        base: ["World's Greatest Stretch", "90/90 Hip Flow", "Cat Cows", "Bird Dogs"] 
    },
    "Thursday": { 
        name: "Speed & Hinge", 
        base: ["Trap Bar Deadlift", "Sprints", "Single Leg RDL", "Nordic Curls"] 
    },
    "Friday": { 
        name: "Full Body Potentiation", 
        base: ["Hang Clean", "Box Jumps", "Push Press", "Lateral Lunges"] 
    },
    "Saturday": { 
        name: "Game/Dunk Day", 
        base: ["Max Approach Jumps", "Rim Touches", "Penultimate Step Iso"] 
    },
    "Sunday": { 
        name: "Rest", 
        base: ["Walk", "Meal Prep"] 
    }
};

// 4. RECIPE ENGINE
const RECIPES = {
    "gain": [
        { name: "The 1,000 Calorie Shake", cals: 1000, desc: "Milk, Oats, PB, Whey, Banana, Olive Oil" },
        { name: "Steak & Potato Load", cals: 800, desc: "8oz Steak, Large Potato, Butter, Asparagus" },
        { name: "Beef Pasta Bowl", cals: 900, desc: "Ground Beef, 2 Cups Pasta, Marinara, Cheese" }
    ],
    "lose": [
        { name: "Chicken Volume Bowl", cals: 500, desc: "8oz Chicken, Cauliflower Rice, Peppers, Salsa" },
        { name: "Egg White Scramble", cals: 350, desc: "1 Cup Egg Whites, Spinach, 1 Slice Toast" },
        { name: "White Fish & Greens", cals: 400, desc: "Tilapia, Broccoli, Lemon, Rice (1/2 cup)" }
    ],
    "maintain": [
        { name: "Salmon & Quinoa", cals: 650, desc: "6oz Salmon, 1 Cup Quinoa, Avocado" },
        { name: "Beef Taco Bowl", cals: 700, desc: "Lean Beef, Rice, Cheese, Lettuce" },
        { name: "Turkey Burger", cals: 600, desc: "Turkey Patty, Bun, Sweet Potato Fries" }
    ]
};

// 5. TECH LIBRARY (Cues)
const TECH_LIBRARY = {
    "Back Squat": "Rip floor apart. Chest tall.",
    "Trap Bar Deadlift": "Push floor away. Hips down.",
    "Bench Press": "Bend the bar. Drive feet.",
    "Sprint": "Strike under hip. Big arms.",
    "Nordic Curls": "Control the fall. Hamstrings only.",
    "Step Ups": "Drive through heel. No push off back leg."
};

// --- APP STATE ---
let state = {
    user: null, // Stores weight, goal, injury, duration
    currentPhase: "hypertrophy",
    activeTab: "dashboard",
    selectedDay: "Monday",
    fuelLog: { water: 0, items: {} }
};

// --- APP LOGIC ---

const app = {
    init: () => {
        // Check Local Storage
        const savedData = localStorage.getItem('coachOS_user');
        if (savedData) {
            state.user = JSON.parse(savedData);
            document.getElementById('onboarding-layer').classList.add('hidden');
            app.loadApp();
        } else {
            document.getElementById('onboarding-layer').classList.remove('hidden');
        }

        // Setup Form Listener
        document.getElementById('setup-form').addEventListener('submit', app.handleOnboarding);
        lucide.createIcons();
    },

    handleOnboarding: (e) => {
        e.preventDefault();
        const weight = document.getElementById('setup-weight').value;
        const diet = document.getElementById('setup-diet').value;
        const perf = document.getElementById('setup-perf').value;
        const injury = document.getElementById('setup-injury').value;
        const duration = document.getElementById('setup-duration').value;

        state.user = { weight, diet, perf, injury, duration };
        localStorage.setItem('coachOS_user', JSON.stringify(state.user));
        
        document.getElementById('onboarding-layer').classList.add('hidden');
        app.loadApp();
    },

    loadApp: () => {
        app.updateHeader();
        app.render();
    },

    clearData: () => {
        if(confirm("Factory Reset System? This will wipe your profile.")) {
            localStorage.removeItem('coachOS_user');
            location.reload();
        }
    },

    updatePhase: (newPhase) => {
        state.currentPhase = newPhase;
        
        // Visual updates for recovery mode
        const body = document.body;
        if (newPhase === 'recovery') {
            body.classList.add('phase-recovery');
        } else {
            body.classList.remove('phase-recovery');
        }
        
        app.render();
    },

    updateHeader: () => {
        // Update Injury Badge
        const badge = document.getElementById('injury-badge');
        const text = document.getElementById('injury-text');
        
        if (state.user.injury !== 'none') {
            badge.classList.remove('hidden');
            text.innerText = state.user.injury.replace('_', ' ');
        } else {
            badge.classList.add('hidden');
        }

        // Set Phase Dropdown to default
        document.getElementById('phase-controller').value = state.currentPhase;
    },

    switchTab: (tab) => {
        state.activeTab = tab;
        
        // Update Nav Icons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            if(btn.id === `nav-${tab}`) {
                btn.classList.add('text-red-500');
                btn.classList.remove('text-neutral-500');
            } else {
                btn.classList.remove('text-red-500');
                btn.classList.add('text-neutral-500');
            }
        });

        app.render();
    },

    selectDay: (day) => {
        state.selectedDay = day;
        app.render();
    },

    actions: {
        toggleFuelItem: (key) => {
            state.fuelLog.items[key] = !state.fuelLog.items[key];
            app.render();
        },
        adjustWater: (amount) => {
            state.fuelLog.water = Math.max(0, state.fuelLog.water + amount);
            app.render();
        },
        toggleExercise: (day, idx) => {
            // In a real app we'd save this to state/localstorage
            const el = document.getElementById(`ex-${idx}`);
            if(el) el.classList.toggle('opacity-50');
        }
    },

    // --- RENDERERS ---

    render: () => {
        const root = document.getElementById('app-root');
        
        if (state.activeTab === 'dashboard') root.innerHTML = app.views.dashboard();
        else if (state.activeTab === 'training') root.innerHTML = app.views.training();
        else if (state.activeTab === 'fuel') root.innerHTML = app.views.fuel();
        
        lucide.createIcons();
    },

    views: {
        dashboard: () => {
            const w = parseInt(state.user.weight) || 150;
            let calMult = state.user.diet === 'gain' ? 18 : (state.user.diet === 'lose' ? 12 : 15);
            const cals = w * calMult;
            const protein = w * 1;

            return `
            <div class="p-5 space-y-6 animate-fade-in">
                <!-- Status Header -->
                <div class="flex justify-between items-end">
                    <div>
                        <h1 class="text-2xl font-black italic tracking-tighter text-white">COMMAND CENTER</h1>
                        <p class="text-xs text-neutral-400 font-mono">WEEK 1 // ${state.user.diet.toUpperCase()} PROTOCOL</p>
                    </div>
                </div>

                <!-- Stats Grid -->
                <div class="grid grid-cols-2 gap-3">
                    <div class="bg-neutral-900 p-4 rounded-xl border border-neutral-800 relative overflow-hidden group hover:border-orange-900/50 transition-all">
                        <div class="absolute top-0 right-0 p-2 opacity-10"><i data-lucide="flame" class="w-12 h-12 text-orange-500"></i></div>
                        <div class="text-neutral-500 text-[10px] font-bold uppercase tracking-widest">Daily Fuel</div>
                        <div class="text-3xl font-black text-white mt-1">${cals}</div>
                        <div class="text-orange-400 text-xs font-mono">kcal target</div>
                    </div>
                    <div class="bg-neutral-900 p-4 rounded-xl border border-neutral-800 relative overflow-hidden group hover:border-red-900/50 transition-all">
                        <div class="absolute top-0 right-0 p-2 opacity-10"><i data-lucide="beef" class="w-12 h-12 text-red-500"></i></div>
                        <div class="text-neutral-500 text-[10px] font-bold uppercase tracking-widest">Protein</div>
                        <div class="text-3xl font-black text-white mt-1">${protein}g</div>
                        <div class="text-red-400 text-xs font-mono">build muscle</div>
                    </div>
                </div>

                <!-- System Status -->
                <div class="bg-neutral-900 border border-neutral-800 p-5 rounded-xl">
                    <h3 class="text-white font-bold text-sm flex items-center mb-4 tracking-wide">
                        <i data-lucide="cpu" class="w-4 h-4 mr-2 text-blue-500"></i> SYSTEM DIAGNOSTICS
                    </h3>
                    <div class="space-y-3">
                        <div class="flex justify-between items-center text-xs">
                            <span class="text-neutral-400">Primary Goal</span>
                            <span class="text-white font-mono uppercase bg-neutral-800 px-2 py-1 rounded border border-neutral-700">${state.user.perf}</span>
                        </div>
                        <div class="flex justify-between items-center text-xs">
                            <span class="text-neutral-400">Active Phase</span>
                            <span class="text-white font-mono uppercase bg-neutral-800 px-2 py-1 rounded border border-neutral-700">${PHASES[state.currentPhase].label}</span>
                        </div>
                        <div class="flex justify-between items-center text-xs">
                            <span class="text-neutral-400">Duration</span>
                            <span class="text-white font-mono uppercase bg-neutral-800 px-2 py-1 rounded border border-neutral-700">${state.user.duration} Weeks</span>
                        </div>
                    </div>
                </div>

                <div class="text-center">
                     <p class="text-[10px] text-neutral-600 font-mono">ID: TONIO-GENETICS-V2</p>
                </div>
            </div>`;
        },

        training: () => {
            const template = WORKOUT_TEMPLATES[state.selectedDay];
            const phase = PHASES[state.currentPhase];
            const injury = INJURY_LOGIC[state.user.injury];

            // Day Selector
            let dayBtns = Object.keys(WORKOUT_TEMPLATES).map(d => `
                <button onclick="app.selectDay('${d}')" class="flex-shrink-0 px-5 py-2 rounded-full text-xs font-bold transition-all border ${state.selectedDay === d ? 'bg-red-600 border-red-600 text-white shadow-lg shadow-red-900/20' : 'bg-transparent border-neutral-800 text-neutral-500 hover:border-neutral-600'}">
                    ${d.substring(0,3).toUpperCase()}
                </button>
            `).join('');

            // Smart Exercise Logic
            let exerciseList = "";
            
            if (state.currentPhase === 'recovery') {
                exerciseList = `
                    <div class="bg-green-900/10 border border-green-900/30 p-5 rounded-xl">
                        <h4 class="text-green-400 font-bold mb-2 flex items-center"><i data-lucide="leaf" class="w-4 h-4 mr-2"></i> Recovery Protocol Active</h4>
                        <p class="text-neutral-400 text-xs mb-4 leading-relaxed">System deload initialized. Focus on blood flow and tissue quality. No heavy loading.</p>
                        <ul class="space-y-3 text-sm text-neutral-300">
                            <li class="flex items-center"><div class="w-1.5 h-1.5 bg-green-500 rounded-full mr-3"></div> 10min Foam Roll / Tissue Work</li>
                            <li class="flex items-center"><div class="w-1.5 h-1.5 bg-green-500 rounded-full mr-3"></div> 15min Static Stretch Flow</li>
                            <li class="flex items-center"><div class="w-1.5 h-1.5 bg-green-500 rounded-full mr-3"></div> 20min Zone 2 Cardio (Walk/Bike)</li>
                        </ul>
                    </div>
                `;
            } else {
                exerciseList = template.base.map((exName, idx) => {
                    let finalName = exName;
                    let isSwapped = false;
                    let cue = TECH_LIBRARY[finalName] || "Perfect form focus.";

                    // Check ban list
                    if (injury.banned.includes(exName)) {
                        finalName = injury.swaps[exName] || "Rest";
                        isSwapped = true;
                        cue = "Modification for injury safety.";
                    }

                    return `
                    <div id="ex-${idx}" onclick="app.actions.toggleExercise('${state.selectedDay}', ${idx})" class="bg-neutral-900 border ${isSwapped ? 'border-red-900/50' : 'border-neutral-800'} p-4 rounded-xl flex justify-between items-center group active:scale-[0.98] transition-all cursor-pointer">
                        <div>
                            <div class="text-white font-bold text-sm flex items-center">
                                ${finalName}
                                ${isSwapped ? '<span class="ml-2 text-[8px] bg-red-900/50 text-red-200 px-1.5 py-0.5 rounded uppercase tracking-wider font-black">SWAP</span>' : ''}
                            </div>
                            <div class="text-neutral-500 text-xs font-mono mt-1">${phase.reps} <span class="text-neutral-600 mx-1">|</span> ${cue}</div>
                        </div>
                        <div class="w-6 h-6 rounded-full border-2 border-neutral-700 flex items-center justify-center group-hover:border-neutral-500">
                            <i data-lucide="check" class="w-3 h-3 text-transparent group-active:text-white transition-colors"></i>
                        </div>
                    </div>`;
                }).join('');
            }

            return `
            <div class="h-full flex flex-col pb-32 animate-slide-up">
                <!-- Day Selector -->
                <div class="p-4 border-b border-neutral-800 overflow-x-auto whitespace-nowrap custom-scrollbar">
                    <div class="flex space-x-2">${dayBtns}</div>
                </div>

                <!-- Workout Container -->
                <div class="p-5 flex-1 overflow-y-auto custom-scrollbar">
                    <div class="flex justify-between items-end mb-4">
                        <h2 class="text-3xl font-black italic uppercase tracking-tighter text-white">${template.name}</h2>
                        <span class="text-[10px] font-bold bg-neutral-800 border border-neutral-700 px-2 py-1 rounded text-neutral-400 uppercase">${phase.focus}</span>
                    </div>
                    
                    <div class="space-y-3">
                        ${exerciseList}
                    </div>

                    <div class="mt-8 text-center text-neutral-600 text-xs font-mono">
                        ${state.currentPhase.toUpperCase()} PHASE ACTIVE
                    </div>
                </div>
            </div>`;
        },

        fuel: () => {
            const dietGoal = state.user.diet;
            const recipes = RECIPES[dietGoal];
            const { water, items } = state.fuelLog;

            const renderFuelItem = (key, label) => `
                <div onclick="app.actions.toggleFuelItem('${key}')" class="flex items-center space-x-3 p-3 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-all cursor-pointer">
                   ${items[key] ? '<i data-lucide="check-circle-2" class="w-5 h-5 text-green-500 fill-green-500/20"></i>' : '<i data-lucide="circle" class="w-5 h-5 text-neutral-600"></i>'}
                   <span class="text-sm text-neutral-300 font-medium">${label}</span>
                </div>`;

            let recipeList = recipes.map(r => `
                <div class="bg-neutral-900 p-4 rounded-xl border border-neutral-800 flex justify-between items-center group">
                    <div>
                        <h4 class="font-bold text-white text-sm group-hover:text-red-400 transition-colors">${r.name}</h4>
                        <p class="text-xs text-neutral-500 mt-1">${r.desc}</p>
                    </div>
                    <span class="text-xs font-mono text-white bg-neutral-800 px-2 py-1 rounded">${r.cals}</span>
                </div>
            `).join('');

            return `
            <div class="p-5 space-y-6 animate-slide-right pb-32">
                
                <!-- Hydration Tracker -->
                <div class="bg-gradient-to-r from-blue-900/20 to-blue-900/10 border border-blue-900/30 p-5 rounded-2xl flex items-center justify-between relative overflow-hidden">
                    <div class="absolute inset-0 bg-blue-500/5 blur-3xl"></div>
                    <div class="flex items-center space-x-4 relative z-10">
                        <div class="p-3 bg-blue-500/20 rounded-full text-blue-400 shadow-lg shadow-blue-900/20"><i data-lucide="droplets" class="w-6 h-6"></i></div>
                        <div>
                            <div class="text-[10px] text-blue-300 font-bold uppercase tracking-widest mb-1">Hydration</div>
                            <div class="text-2xl font-black text-white">${state.fuelLog.water} <span class="text-sm font-medium opacity-50">/ 8</span></div>
                        </div>
                    </div>
                    <div class="flex items-center space-x-2 relative z-10">
                        <button onclick="app.actions.adjustWater(-1)" class="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-700 text-white flex items-center justify-center font-bold hover:bg-neutral-800 transition-colors">-</button>
                        <button onclick="app.actions.adjustWater(1)" class="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold hover:bg-blue-500 shadow-lg shadow-blue-900/30 transition-colors">+</button>
                    </div>
                </div>

                <!-- Daily Checklist -->
                <div>
                    <h3 class="text-white font-bold text-sm mb-3 flex items-center"><i data-lucide="check-square" class="w-4 h-4 mr-2 text-red-500"></i> DAILY PROTOCOL</h3>
                    <div class="space-y-2">
                         ${renderFuelItem('morningHydration', '16oz Water + Electrolytes')}
                         ${renderFuelItem('creatine', '5g Creatine')}
                         ${renderFuelItem('tendonShot', 'Collagen/Vit C Shot')}
                         ${renderFuelItem('nightShake', 'Protein Shake')}
                    </div>
                </div>

                <!-- Meal Plan -->
                <div>
                    <h3 class="text-white font-bold text-sm mb-3 flex items-center uppercase"><i data-lucide="chef-hat" class="w-4 h-4 mr-2 text-red-500"></i> ${state.user.diet} MEALS</h3>
                    <div class="space-y-3">
                        ${recipeList}
                    </div>
                </div>
            </div>`;
        }
    }
};

// Start App
window.onload = app.init;


