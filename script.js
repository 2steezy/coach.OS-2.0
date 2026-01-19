// --- CONFIGURATION & DATABASES ---

const INJURY_LOGIC = {
    "hip_labrum": {
        "banned": ["Back Squat", "Deep Lunges", "Conventional Deadlift", "Pistol Squat"],
        "swaps": {
            "Back Squat": "Trap Bar Deadlift (High Handles)",
            "Deep Lunges": "Step Ups (Low Box)",
            "Conventional Deadlift": "RDL (Range Limited)",
            "Pistol Squat": "Glute Bridge Iso"
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
        "banned": ["Pogo Hops", "Broad Jumps", "Sprints", "Calf Raises"],
        "swaps": {
            "Pogo Hops": "Seated Calf Iso",
            "Broad Jumps": "Kb Swings",
            "Sprints": "Assault Bike",
            "Calf Raises": "Tibialis Raises (Seated)"
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
    "shoulder": {
        "banned": ["Overhead Press", "Bench Press", "Dips"],
        "swaps": {
            "Overhead Press": "Landmine Press",
            "Bench Press": "Floor Press (Neutral Grip)",
            "Dips": "Tricep Pushdowns"
        }
    },
    "groin": {
        "banned": ["Lateral Lunges", "Sumo Deadlift", "Copenhagen Planks"],
        "swaps": {
            "Lateral Lunges": "Forward Lunges",
            "Sumo Deadlift": "Trap Bar Deadlift",
            "Copenhagen Planks": "Front Planks"
        }
    },
    "none": { banned: [], swaps: {} }
};

const PHASES = {
    "hypertrophy": { label: "Hypertrophy", reps: "3 x 10-12", intensity: "Mod" },
    "strength": { label: "Strength", reps: "5 x 3-5", intensity: "High" },
    "power": { label: "Power", reps: "4 x 3", intensity: "Explosive" },
    "in_season": { label: "In-Season", reps: "3 x 3", intensity: "Maint" },
    "recovery": { label: "RECOVERY MODE", reps: "Duration", intensity: "Low" }
};

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
        base: ["Trap Bar Deadlift", "Sprints", "RDL", "Nordic Curls"] 
    },
    "Friday": { 
        name: "Full Body Potentiation", 
        base: ["Power Clean", "Box Jumps", "Push Press", "Lateral Lunges"] 
    },
    "Saturday": { 
        name: "Game/Dunk Day", 
        base: ["Max Approach Jumps", "Rim Touches"] 
    },
    "Sunday": { 
        name: "Rest", 
        base: ["Walk", "Meal Prep"] 
    }
};

const RECIPES = {
    "gain": [
        { name: "The 1,000 Calorie Shake", cals: 1000, desc: "Milk, Oats, PB, Whey, Banana, Olive Oil" },
        { name: "Steak & Potato Load", cals: 800, desc: "8oz Steak, Large Potato, Butter, Asparagus" }
    ],
    "lose": [
        { name: "Chicken Volume Bowl", cals: 500, desc: "8oz Chicken, Cauliflower Rice, Peppers, Salsa" },
        { name: "Egg White Scramble", cals: 350, desc: "1 Cup Egg Whites, Spinach, 1 Slice Toast" }
    ],
    "maintain": [
        { name: "Salmon & Quinoa", cals: 650, desc: "6oz Salmon, 1 Cup Quinoa, Avocado" },
        { name: "Beef Taco Bowl", cals: 700, desc: "Lean Beef, Rice, Cheese, Lettuce" }
    ]
};

// --- STATE MANAGEMENT ---

let state = {
    user: null, // Stores weight, goal, injury, duration
    currentPhase: "hypertrophy",
    activeTab: "dashboard",
    selectedDay: "Monday"
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
        if(confirm("Reset System? This will wipe your profile.")) {
            localStorage.removeItem('coachOS_user');
            location.reload();
        }
    },

    updatePhase: (newPhase) => {
        state.currentPhase = newPhase;
        
        // Visual updates for recovery mode
        const header = document.querySelector('header');
        if (newPhase === 'recovery') {
            header.classList.add('phase-recovery');
            document.getElementById('phase-controller').classList.add('bg-recovery');
        } else {
            header.classList.remove('phase-recovery');
            document.getElementById('phase-controller').classList.remove('bg-recovery');
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
            const w = parseInt(state.user.weight);
            let calMult = state.user.diet === 'gain' ? 18 : (state.user.diet === 'lose' ? 12 : 15);
            const cals = w * calMult;
            const protein = w * 1;

            return `
            <div class="p-4 space-y-6 animate-fade-in">
                <!-- Stats Grid -->
                <div class="grid grid-cols-2 gap-3">
                    <div class="bg-neutral-800 p-4 rounded-xl border border-neutral-700 relative overflow-hidden">
                        <div class="absolute top-0 right-0 p-2 opacity-10"><i data-lucide="flame" class="w-12 h-12 text-orange-500"></i></div>
                        <div class="text-neutral-500 text-[10px] font-bold uppercase tracking-widest">Daily Fuel</div>
                        <div class="text-3xl font-black text-white mt-1">${cals}</div>
                        <div class="text-orange-400 text-xs font-mono">kcal target</div>
                    </div>
                    <div class="bg-neutral-800 p-4 rounded-xl border border-neutral-700 relative overflow-hidden">
                        <div class="absolute top-0 right-0 p-2 opacity-10"><i data-lucide="beef" class="w-12 h-12 text-red-500"></i></div>
                        <div class="text-neutral-500 text-[10px] font-bold uppercase tracking-widest">Protein</div>
                        <div class="text-3xl font-black text-white mt-1">${protein}g</div>
                        <div class="text-red-400 text-xs font-mono">build muscle</div>
                    </div>
                </div>

                <!-- Active Protocol Card -->
                <div class="bg-neutral-900 border border-neutral-800 p-4 rounded-xl">
                    <h3 class="text-white font-bold text-sm flex items-center mb-4">
                        <i data-lucide="cpu" class="w-4 h-4 mr-2 text-blue-500"></i> System Status
                    </h3>
                    <div class="space-y-3">
                        <div class="flex justify-between items-center text-xs">
                            <span class="text-neutral-400">Diet Phase</span>
                            <span class="text-white font-mono uppercase bg-neutral-800 px-2 py-1 rounded">${state.user.diet}</span>
                        </div>
                        <div class="flex justify-between items-center text-xs">
                            <span class="text-neutral-400">Perf. Goal</span>
                            <span class="text-white font-mono uppercase bg-neutral-800 px-2 py-1 rounded">${state.user.perf}</span>
                        </div>
                        <div class="flex justify-between items-center text-xs">
                            <span class="text-neutral-400">Duration</span>
                            <span class="text-white font-mono uppercase bg-neutral-800 px-2 py-1 rounded">${state.user.duration} Weeks</span>
                        </div>
                    </div>
                </div>
            </div>`;
        },

        training: () => {
            const template = WORKOUT_TEMPLATES[state.selectedDay];
            const phase = PHASES[state.currentPhase];
            const injury = INJURY_LOGIC[state.user.injury];

            // Day Selector Buttons
            let dayBtns = Object.keys(WORKOUT_TEMPLATES).map(d => `
                <button onclick="app.selectDay('${d}')" class="px-4 py-2 rounded-lg text-xs font-bold transition-all ${state.selectedDay === d ? 'bg-white text-black' : 'bg-neutral-800 text-neutral-500'}">
                    ${d.substring(0,3)}
                </button>
            `).join('');

            // Smart Exercise Generator
            let exerciseList = "";
            
            if (state.currentPhase === 'recovery') {
                // RECOVERY OVERRIDE
                exerciseList = `
                    <div class="bg-green-900/10 border border-green-900/30 p-4 rounded-xl">
                        <h4 class="text-green-400 font-bold mb-2">Recovery Protocol Active</h4>
                        <p class="text-neutral-400 text-xs mb-4">Central Nervous System deload active. Focus on tissue quality.</p>
                        <ul class="space-y-3 text-sm text-neutral-300">
                            <li class="flex items-center"><i data-lucide="check" class="w-4 h-4 mr-2 text-green-500"></i> 10min Foam Roll</li>
                            <li class="flex items-center"><i data-lucide="check" class="w-4 h-4 mr-2 text-green-500"></i> 15min Static Stretch</li>
                            <li class="flex items-center"><i data-lucide="check" class="w-4 h-4 mr-2 text-green-500"></i> 20min Walk / Light Bike</li>
                        </ul>
                    </div>
                `;
            } else {
                // STANDARD GENERATION WITH SWAPS
                exerciseList = template.base.map(exName => {
                    let finalName = exName;
                    let isSwapped = false;

                    // Check if banned
                    if (injury.banned.includes(exName)) {
                        finalName = injury.swaps[exName] || "Rest";
                        isSwapped = true;
                    }

                    return `
                    <div class="bg-neutral-800 border ${isSwapped ? 'border-red-900/50' : 'border-neutral-700'} p-4 rounded-xl flex justify-between items-center">
                        <div>
                            <div class="text-white font-bold text-sm flex items-center">
                                ${finalName}
                                ${isSwapped ? '<span class="ml-2 text-[8px] bg-red-900 text-red-200 px-1 rounded uppercase tracking-wider">Injury Swap</span>' : ''}
                            </div>
                            <div class="text-neutral-400 text-xs font-mono mt-1">${phase.reps}</div>
                        </div>
                        <div class="w-6 h-6 border-2 border-neutral-600 rounded-full"></div>
                    </div>`;
                }).join('');
            }

            return `
            <div class="h-full flex flex-col">
                <div class="p-4 border-b border-neutral-800 overflow-x-auto whitespace-nowrap">
                    <div class="flex space-x-2">${dayBtns}</div>
                </div>
                <div class="p-4 flex-1 overflow-y-auto space-y-4">
                    <div class="flex justify-between items-end">
                        <h2 class="text-2xl font-black italic uppercase">${template.name}</h2>
                        <span class="text-[10px] font-bold bg-neutral-800 px-2 py-1 rounded text-neutral-400 uppercase">${phase.intensity}</span>
                    </div>
                    <div class="space-y-3 mt-4">
                        ${exerciseList}
                    </div>
                </div>
            </div>`;
        },

        fuel: () => {
            const dietGoal = state.user.diet; // gain, lose, maintain
            const recipes = RECIPES[dietGoal];

            let html = recipes.map(r => `
                <div class="bg-neutral-800 p-4 rounded-xl border border-neutral-700">
                    <div class="flex justify-between items-start mb-2">
                        <h4 class="font-bold text-white">${r.name}</h4>
                        <span class="text-xs font-mono text-orange-400">${r.cals} kcal</span>
                    </div>
                    <p class="text-xs text-neutral-400">${r.desc}</p>
                </div>
            `).join('');

            return `
            <div class="p-4 space-y-6">
                <div class="bg-gradient-to-r from-neutral-800 to-neutral-900 p-6 rounded-2xl border border-neutral-700 text-center">
                    <h2 class="text-2xl font-black text-white mb-1 uppercase">${dietGoal} Mode</h2>
                    <p class="text-neutral-500 text-xs">Recommended Meals</p>
                </div>
                <div class="space-y-4">
                    ${html}
                </div>
            </div>`;
        }
    }
};

// Start App
window.onload = app.init;


