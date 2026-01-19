// --- CONFIGURATION & DATA ---

// Injury Database for Onboarding Dropdowns
const injuryDatabase = {
    "Ankle": ["Loose Tendon", "Sprain", "Achilles Tendonitis", "Impingement", "Fracture Recovery"],
    "Knee": ["Patellar Tendonitis", "ACL Rehab", "Meniscus", "IT Band Syndrome", "Osgood-Schlatter"],
    "Hip": ["Impingement (FAI)", "Flexor Strain", "Labral Tear", "Adductor Strain", "Tightness"],
    "Back": ["Lower Back Pain", "Disc Issues", "Sciatica", "Muscle Strain"],
    "Shoulder": ["Rotator Cuff", "Impingement", "Labrum", "Stability"],
    "Groin": ["Strain", "Hernia Recovery", "Adductor Pain"]
};

// Smart Brain: Injury Swap Dictionary
const INJURY_LOGIC = {
    "Hip": {
        "banned": ["Back Squat", "Deep Lunges", "Conventional Deadlift", "Pistol Squat", "Lateral Lunges"],
        "swaps": {
            "Back Squat": "Trap Bar Deadlift (High Handles)",
            "Deep Lunges": "Step Ups (Low Box)",
            "Conventional Deadlift": "RDL (Range Limited)",
            "Pistol Squat": "Glute Bridge Iso",
            "Lateral Lunges": "Forward Lunges"
        }
    },
    "Knee": {
        "banned": ["Deep Lunges", "Bulgarian Split Squats", "Forward Jumps", "Pistol Squat", "Box Jumps"],
        "swaps": {
            "Deep Lunges": "Reverse Lunges (Vertical Shin)",
            "Bulgarian Split Squats": "Spanish Squat Holds",
            "Forward Jumps": "Box Jumps (Soft Landing)",
            "Pistol Squat": "Wall Sit",
            "Box Jumps": "Step Ups (Power)"
        }
    },
    "Ankle": {
        "banned": ["Pogo Hops", "Broad Jumps", "Sprints", "Calf Raises", "Depth Drops"],
        "swaps": {
            "Pogo Hops": "Seated Calf Iso",
            "Broad Jumps": "Kb Swings",
            "Sprints": "Assault Bike",
            "Calf Raises": "Tibialis Raises (Seated)",
            "Depth Drops": "Tempo Goblet Squats"
        }
    },
    "Back": {
        "banned": ["Back Squat", "Conventional Deadlift", "Bent Over Row", "Overhead Press"],
        "swaps": {
            "Back Squat": "Goblet Squat",
            "Conventional Deadlift": "Chest Supported Row",
            "Bent Over Row": "Seal Row",
            "Overhead Press": "Landmine Press"
        }
    },
    "Groin": {
        "banned": ["Lateral Lunges", "Sumo Deadlift", "Copenhagen Planks", "Broad Jumps"],
        "swaps": {
            "Lateral Lunges": "Forward Lunges",
            "Sumo Deadlift": "Trap Bar Deadlift",
            "Copenhagen Planks": "Front Planks",
            "Broad Jumps": "Vertical Jumps"
        }
    }
};

// Phases Data
const phases = {
    1: {
        name: "Hypertrophy",
        label: "Hypertrophy",
        weeks: "Weeks 1-4",
        focus: "Tissue Capacity",
        reps: "3 x 10-12",
        workouts: {
            Monday: { title: "Accel & Squat", focus: "Force", exercises: [
                { name: "Broad Jumps", sets: "3x3", completed: false },
                { name: "10m Starts", sets: "5 reps", completed: false },
                { name: "Back Squat", sets: "4x6", completed: false },
                { name: "Bulgarian Split Squats", sets: "3x8/leg", completed: false },
                { name: "Weighted Planks", sets: "3x30s", completed: false }
            ]},
            Tuesday: { title: "Upper & Ankle Armor", focus: "Mass/Tendon", exercises: [
                { name: "Bench Press", sets: "4x8", completed: false },
                { name: "Weighted Pull-Ups", sets: "4x6", completed: false },
                { name: "Iso-Lunge Holds", sets: "3x45s/side", completed: false },
                { name: "Tibialis Raises", sets: "3x15", completed: false }
            ]},
            Wednesday: { title: "Active Recovery", focus: "Mobility", exercises: [
                { name: "Light Bike/Pool", sets: "20 min", completed: false },
                { name: "World's Greatest Stretch", sets: "10 min", completed: false },
                { name: "Mock Dunk Approaches", sets: "10 reps", completed: false }
            ]},
            Thursday: { title: "Max Velocity", focus: "Speed", exercises: [
                { name: "Pogo Hops", sets: "3x10s", completed: false },
                { name: "Flying 10s", sets: "4 reps", completed: false },
                { name: "Trap Bar Deadlift", sets: "3x6", completed: false },
                { name: "Single Leg RDL", sets: "3x8/leg", completed: false }
            ]},
            Friday: { title: "Upper & Power", focus: "Elasticity", exercises: [
                { name: "Overhead Press", sets: "4x8", completed: false },
                { name: "Seated Box Jumps", sets: "3x5", completed: false },
                { name: "Lateral Lunges", sets: "3x8/side", completed: false }
            ]},
            Saturday: { title: "Dunk Session", focus: "Sport", exercises: [
                { name: "Max Approach Jumps", sets: "10 reps", completed: false },
                { name: "Penultimate Step Iso", sets: "3x10s", completed: false }
            ]},
            Sunday: { title: "Rest", focus: "Recovery", exercises: [
                { name: "Meal Prep", sets: "Weekly", completed: false },
                { name: "Sleep", sets: "9+ Hours", completed: false }
            ]}
        }
    },
    2: {
        name: "Strength",
        label: "Strength",
        weeks: "Weeks 5-8",
        focus: "Force Production",
        reps: "5 x 3-5",
        workouts: {
            Monday: { title: "Contrast Squat", focus: "Max Force", exercises: [
                { name: "Back Squat", sets: "4x4 @ 85%", completed: false },
                { name: "Vertical Jump", sets: "4x3 (Immed. After)", completed: false },
                { name: "Depth Drops", sets: "3x5", completed: false }
            ]},
            Tuesday: { title: "Upper Hypertrophy", focus: "Mass", exercises: [
                { name: "Incline Bench", sets: "4x8", completed: false },
                { name: "DB Rows", sets: "4x10", completed: false },
                { name: "Iso-Lunge Holds", sets: "4x45s", completed: false }
            ]},
            Wednesday: { title: "Recovery", focus: "Mobility", exercises: [
                { name: "Pool Work", sets: "20 mins", completed: false },
                { name: "Hip Flow", sets: "15 mins", completed: false }
            ]},
            Thursday: { title: "Speed Power", focus: "Velocity", exercises: [
                { name: "Hang Clean", sets: "4x3", completed: false },
                { name: "Flying 20s", sets: "4 reps", completed: false },
                { name: "Nordic Curls", sets: "3x5", completed: false }
            ]},
            Friday: { title: "Upper & Plyo", focus: "Elasticity", exercises: [
                { name: "Weighted Dips", sets: "3x8", completed: false },
                { name: "Depth Jumps", sets: "3x4", completed: false },
                { name: "Lateral Bounds", sets: "3x6/side", completed: false }
            ]},
            Saturday: { title: "Dunk Session", focus: "Max Touch", exercises: [
                { name: "Lob Dunks", sets: "10-15 reps", completed: false }
            ]},
            Sunday: { title: "Rest", focus: "Sleep", exercises: [{ name: "Sleep", sets: "10 hrs", completed: false }]}
        }
    },
    3: {
        name: "Power",
        label: "Power",
        weeks: "Weeks 9-12",
        focus: "Velocity",
        reps: "4 x 3",
        workouts: {
            Monday: { title: "Max Power", focus: "Neural Drive", exercises: [
                { name: "Quarter Squat", sets: "3x3 @ 90%", completed: false },
                { name: "Max Vertical Jump", sets: "5x1", completed: false }
            ]},
            Tuesday: { title: "Upper Maintenance", focus: "Tone", exercises: [
                { name: "Push Ups (Explosive)", sets: "3x10", completed: false },
                { name: "Chin Ups", sets: "3x8", completed: false }
            ]},
            Wednesday: { title: "Recovery", focus: "Mobility", exercises: [{ name: "Massage/Foam Roll", sets: "20 min", completed: false }]},
            Thursday: { title: "Overspeed", focus: "Twitch", exercises: [
                { name: "Assisted Jumps (Band)", sets: "4x4", completed: false },
                { name: "Flying 10s", sets: "3 reps (Max)", completed: false }
            ]},
            Friday: { title: "Priming", focus: "Activation", exercises: [
                { name: "Trap Bar Jump", sets: "4x3 (Light)", completed: false },
                { name: "Medicine Ball Slam", sets: "3x5", completed: false }
            ]},
            Saturday: { title: "Dunk Day", focus: "PR Attempt", exercises: [
                { name: "Dunk Attempts", sets: "Max Effort", completed: false }
            ]},
            Sunday: { title: "Rest", focus: "Sleep", exercises: [{ name: "Sleep", sets: "10 hrs", completed: false }]}
        }
    }
};

const techLibrary = [
    { name: "Back Squat", cues: "Rip floor apart. Chest tall.", alerts: ["Hip", "Ankle"] },
    { name: "Bulgarian Split Squat", cues: "Drop back knee straight down.", alerts: ["Ankle"] },
    { name: "Weighted Planks", cues: "Squeeze glutes. Don't sag.", alerts: [] },
    { name: "Iso-Lunge Holds", cues: "Knee hover 1 inch. HOLD.", alerts: ["Ankle"] },
    { name: "Single Leg RDL", cues: "Hinge at hip. Back leg long.", alerts: ["Hip"] },
    { name: "Pogo Hops", cues: "Ankles only. Knees stiff.", alerts: ["Ankle"] },
    { name: "Depth Drops", cues: "Step off. Stick landing (silent).", alerts: ["Ankle"] }
];

// --- APP STATE ---

let state = {
    activeTab: 'dashboard',
    currentPhase: 1, // can be 1, 2, 3, or 'recovery'
    selectedDay: 'Monday',
    recipeFilter: 'All',
    // Default stats to prevent crash before onboarding
    stats: {
        weight: 150,
        diet: 'gain',
        duration: 12,
        goals: {
            physique: "150 lbs",
            strength: "350lb Squat",
            performance: "Dunk"
        },
        injuries: []
    },
    // Temporary onboarding state
    onboardingInjuries: [],
    fuelLog: {
        water: 0,
        items: {
            morningHydration: false, breakfast: false, creatine: false, lunch: false,
            tendonShot: false, preWorkoutCarb: false, postWorkoutMeal: false,
            postWorkoutShake: false, dinner: false, nightShake: false
        }
    },
    recipes: [
        { id: 1, type: "Breakfast", title: "The Power Omelet", calories: "600", ingredients: ["3 Eggs", "1/2 Cup Cheese", "Spinach", "2 Toast slices", "1 Avocado"] },
        { id: 2, type: "Breakfast", title: "Pro-Oats Bowl", calories: "550", ingredients: ["1 Cup Oats", "1 Scoop Whey", "Berries", "1 Tbsp Peanut Butter"] },
        { id: 3, type: "Lunch", title: "Chicken & Rice Load", calories: "750", ingredients: ["8oz Chicken Thigh", "2 Cups White Rice", "Olive Oil Drizzle", "Broccoli"] },
        { id: 4, type: "Lunch", title: "Beef Pasta", calories: "800", ingredients: ["8oz Ground Beef", "2 Cups Pasta", "Marinara Sauce", "Parmesan"] },
        { id: 5, type: "Dinner", title: "Steak & Potato", calories: "700", ingredients: ["8oz Steak", "1 Large Potato", "Asparagus", "Butter"] },
        { id: 6, type: "Shake", title: "1,000 Calorie Shake", calories: "1130", ingredients: ["2 Cups Whole Milk", "1 Cup Oats (Blended)", "2 Tbsp PB", "1 Banana", "1 Scoop Whey", "1 Tbsp Olive Oil"] },
        { id: 7, type: "Shake", title: "Tendon Shot", calories: "100", ingredients: ["15g Collagen", "500mg Vitamin C (OJ)"] },
    ],
    workouts: JSON.parse(JSON.stringify(phases[1].workouts))
};

// --- CORE APP ---

const app = {
    init: () => {
        // Load data from LocalStorage
        const savedData = localStorage.getItem('coachOS_user_v2');
        if (savedData) {
            const parsed = JSON.parse(savedData);
            state.stats = parsed;
            document.getElementById('onboarding-layer').classList.add('hidden');
        } else {
            // Show Onboarding
            document.getElementById('onboarding-layer').classList.remove('hidden');
            // Populate initial dropdown
            app.actions.updateSetupInjuryDropdown();
        }

        app.render();
        lucide.createIcons();
    },

    switchTab: (tab) => {
        state.activeTab = tab;
        app.render();
    },

    updateNav: () => {
        document.querySelectorAll('.nav-btn').forEach(btn => {
            const isActive = btn.id === `nav-${state.activeTab}`;
            if (isActive) btn.classList.add('active');
            else btn.classList.remove('active');
        });
        
        // Update Phase Controller UI
        const pc = document.getElementById('phase-controller');
        if(pc) pc.value = state.currentPhase;

        lucide.createIcons();
    },

    // --- RENDER FUNCTIONS ---

    render: () => {
        const root = document.getElementById('app-root');
        app.updateNav();
        
        // Body Class for Recovery Mode Theme
        if (state.currentPhase === 'recovery') document.body.classList.add('phase-recovery');
        else document.body.classList.remove('phase-recovery');

        let content = '';
        if (state.activeTab === 'dashboard') content = app.views.dashboard();
        else if (state.activeTab === 'training') content = app.views.training();
        else if (state.activeTab === 'fuel') content = app.views.fuel();
        else if (state.activeTab === 'tech') content = app.views.tech();

        root.innerHTML = content;
        lucide.createIcons();
    },

    views: {
        dashboard: () => {
            const { weight, diet, goals, injuries, duration } = state.stats;
            const { water, items } = state.fuelLog;

            // Calculate Macros
            const w = parseInt(weight) || 150;
            let calMult = diet === 'gain' ? 18 : (diet === 'lose' ? 12 : 15);
            const cals = w * calMult;
            const protein = w * 1;

            const renderFuelItem = (key, label) => `
                <div onclick="app.actions.toggleFuelItem('${key}')" class="flex items-center space-x-3 p-3 rounded-lg bg-neutral-800/50 border border-transparent hover:border-neutral-700 transition-all cursor-pointer ${items[key] ? 'opacity-50' : ''}">
                   ${items[key] ? '<i data-lucide="check-circle-2" class="w-5 h-5 text-green-500 fill-green-500/20"></i>' : '<i data-lucide="circle" class="w-5 h-5 text-neutral-600"></i>'}
                   <span class="text-sm text-neutral-300 font-medium">${label}</span>
                </div>`;

            const injuryTags = injuries.map(inj => 
                `<span class="inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold bg-red-900/30 text-red-400 border border-red-900/50 mr-2 mb-1">
                    ${inj.part}: ${inj.issue}
                 </span>`
            ).join('');

            const phaseLabel = state.currentPhase === 'recovery' ? 'RECOVERY' : phases[state.currentPhase].name.toUpperCase();

            return `
            <div class="h-full overflow-y-auto custom-scrollbar p-5 space-y-6 pb-32 animate-fade-in">
                
                <!-- Welcome / Status Header -->
                <div class="flex items-center justify-between mb-2">
                    <div>
                        <h1 class="text-2xl font-black italic tracking-tighter text-white">COMMAND CENTER</h1>
                        <p class="text-xs text-neutral-400 font-mono">WEEK 1 // ${diet.toUpperCase()} PROTOCOL</p>
                    </div>
                    <div class="h-10 w-10 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center shadow-lg shadow-red-900/20">
                        <i data-lucide="activity" class="text-white w-5 h-5"></i>
                    </div>
                </div>

                <!-- Live Goals Grid -->
                <div class="grid grid-cols-3 gap-2">
                    <div class="bg-neutral-900 p-3 rounded-xl border border-neutral-800 flex flex-col items-center text-center">
                        <span class="text-[9px] font-bold text-neutral-500 uppercase tracking-widest mb-1">PHYSIQUE</span>
                        <span class="text-xs font-black text-white">${goals.physique}</span>
                        <span class="text-[9px] text-neutral-400 mt-1">Current: ${weight}</span>
                    </div>
                    <div class="bg-neutral-900 p-3 rounded-xl border border-neutral-800 flex flex-col items-center text-center">
                        <span class="text-[9px] font-bold text-neutral-500 uppercase tracking-widest mb-1">STRENGTH</span>
                        <span class="text-xs font-black text-white">${goals.strength}</span>
                    </div>
                    <div class="bg-neutral-900 p-3 rounded-xl border border-neutral-800 flex flex-col items-center text-center">
                        <span class="text-[9px] font-bold text-neutral-500 uppercase tracking-widest mb-1">PERF</span>
                        <span class="text-xs font-black text-white">${goals.performance}</span>
                    </div>
                </div>

                <!-- Stats & Nutrition Grid -->
                <div class="grid grid-cols-2 gap-3">
                    <div class="bg-neutral-900 p-4 rounded-xl border border-neutral-800 relative overflow-hidden group">
                        <div class="absolute top-0 right-0 p-2 opacity-10"><i data-lucide="flame" class="w-12 h-12 text-orange-500"></i></div>
                        <div class="text-neutral-500 text-[10px] font-bold uppercase tracking-widest">Target Cals</div>
                        <div class="text-3xl font-black text-white mt-1">${cals}</div>
                        <div class="text-orange-400 text-xs font-mono">daily fuel</div>
                    </div>
                    <div class="bg-neutral-900 p-4 rounded-xl border border-neutral-800 relative overflow-hidden group">
                        <div class="absolute top-0 right-0 p-2 opacity-10"><i data-lucide="beef" class="w-12 h-12 text-red-500"></i></div>
                        <div class="text-neutral-500 text-[10px] font-bold uppercase tracking-widest">Protein</div>
                        <div class="text-3xl font-black text-white mt-1">${protein}g</div>
                        <div class="text-red-400 text-xs font-mono">build muscle</div>
                    </div>
                </div>

                <!-- Injury Status -->
                <div class="bg-neutral-900/80 border border-neutral-800 p-4 rounded-xl relative overflow-hidden">
                    <div class="absolute top-0 right-0 w-16 h-16 bg-red-600/10 rounded-full blur-2xl -mr-8 -mt-8"></div>
                    <div class="flex items-start space-x-3 relative z-10">
                        <div class="p-2 bg-red-900/20 rounded-lg">
                            <i data-lucide="alert-triangle" class="text-red-500 w-5 h-5"></i>
                        </div>
                        <div class="flex-1">
                            <h3 class="text-white font-bold text-sm mb-2">ACTIVE SYSTEM ALERTS</h3>
                            <div class="flex flex-wrap">${injuryTags || '<span class="text-xs text-neutral-500">System Optimal. No Injuries.</span>'}</div>
                        </div>
                    </div>
                </div>

                <!-- System Info -->
                <div class="bg-neutral-900 border border-neutral-800 p-4 rounded-xl">
                    <div class="flex justify-between items-center text-xs mb-2">
                        <span class="text-neutral-400">Active Phase</span>
                        <span class="text-white font-mono uppercase bg-neutral-800 px-2 py-1 rounded border border-neutral-700">${phaseLabel}</span>
                    </div>
                    <div class="flex justify-between items-center text-xs">
                        <span class="text-neutral-400">Program Duration</span>
                        <span class="text-white font-mono uppercase bg-neutral-800 px-2 py-1 rounded border border-neutral-700">${duration} Weeks</span>
                    </div>
                </div>

                <!-- Driver's Schedule -->
                <div>
                    <h2 class="text-neutral-200 font-bold text-sm mb-3 flex items-center tracking-wide">
                        <i data-lucide="clock" class="w-4 h-4 mr-2 text-red-500"></i> DAILY PROTOCOL
                    </h2>
                    <div class="space-y-4 relative pl-4 border-l-2 border-neutral-800 ml-2">
                        <!-- Morning -->
                        <div class="relative">
                            <div class="absolute -left-[21px] top-0 h-3 w-3 rounded-full bg-yellow-500 border-2 border-[#121212]"></div>
                            <h4 class="text-[10px] font-bold text-yellow-500 uppercase mb-2 ml-2">07:00 AM // FUELING</h4>
                            <div class="space-y-2">
                                ${renderFuelItem('morningHydration', '16oz Water + Electrolytes')}
                                ${renderFuelItem('breakfast', 'High Protein Breakfast')}
                            </div>
                        </div>

                        <!-- Training -->
                        <div class="relative">
                            <div class="absolute -left-[21px] top-0 h-3 w-3 rounded-full bg-red-600 border-2 border-[#121212]"></div>
                            <h4 class="text-[10px] font-bold text-red-500 uppercase mb-2 ml-2">02:00 PM // PRE-HAB</h4>
                            <div class="space-y-2">
                                ${renderFuelItem('tendonShot', 'Tendon Shot (Collagen)')}
                                ${renderFuelItem('preWorkoutCarb', 'Quick Carbs (Fruit)')}
                            </div>
                        </div>

                        <!-- Night -->
                        <div class="relative">
                            <div class="absolute -left-[21px] top-0 h-3 w-3 rounded-full bg-indigo-500 border-2 border-[#121212]"></div>
                            <h4 class="text-[10px] font-bold text-indigo-500 uppercase mb-2 ml-2">09:00 PM // RECOVERY</h4>
                            <div class="space-y-2">
                                ${renderFuelItem('dinner', 'Dinner (Steak/Potato)')}
                                ${renderFuelItem('nightShake', '1,000 Calorie Shake')}
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Bottom Spacer -->
                <div class="h-12"></div>
            </div>`;
        },

        training: () => {
            const workout = state.workouts[state.selectedDay];
            
            // Phase info logic
            let phaseData = { label: 'Recovery', reps: 'Duration', focus: 'Mobility' };
            if(state.currentPhase !== 'recovery') {
                phaseData = phases[state.currentPhase];
            }

            // Day Selector
            let daysHTML = Object.keys(state.workouts).map(day => `
                <button onclick="app.actions.selectDay('${day}')" class="flex-shrink-0 px-5 py-2 rounded-full text-xs font-bold tracking-wide transition-all border ${state.selectedDay === day ? 'bg-red-600 border-red-600 text-white shadow-lg shadow-red-900/30' : 'bg-transparent border-neutral-800 text-neutral-500 hover:border-neutral-600'}">
                    ${day.substring(0, 3).toUpperCase()}
                </button>
            `).join('');

            // SMART BRAIN EXERCISE GENERATION
            let exercisesHTML = "";

            if (state.currentPhase === 'recovery') {
                // Recovery Override
                exercisesHTML = `
                    <div class="bg-green-900/10 border border-green-900/30 p-5 rounded-xl">
                        <h4 class="text-green-400 font-bold mb-2 flex items-center"><i data-lucide="leaf" class="w-4 h-4 mr-2"></i> Recovery Protocol Active</h4>
                        <p class="text-neutral-400 text-xs mb-4 leading-relaxed">System deload initialized. Focus on blood flow and tissue quality. No heavy loading.</p>
                        <ul class="space-y-3 text-sm text-neutral-300">
                            <li class="flex items-center"><div class="w-1.5 h-1.5 bg-green-500 rounded-full mr-3"></div> 10min Foam Roll / Tissue Work</li>
                            <li class="flex items-center"><div class="w-1.5 h-1.5 bg-green-500 rounded-full mr-3"></div> 15min Static Stretch Flow</li>
                            <li class="flex items-center"><div class="w-1.5 h-1.5 bg-green-500 rounded-full mr-3"></div> 20min Zone 2 Cardio (Walk/Bike)</li>
                        </ul>
                    </div>`;
            } else {
                // Loop through exercises and check against ALL injuries
                exercisesHTML = workout.exercises.map((ex, idx) => {
                    let finalName = ex.name;
                    let isSwapped = false;
                    let swapReason = "";

                    // CHECK INJURY DICTIONARY
                    // Iterate through user's active injuries
                    state.stats.injuries.forEach(inj => {
                        const logic = INJURY_LOGIC[inj.part];
                        if (logic && logic.banned.includes(ex.name)) {
                            // Found a banned exercise
                            finalName = logic.swaps[ex.name] || "Rest / Mobility";
                            isSwapped = true;
                            swapReason = inj.part;
                        }
                    });

                    return `
                    <div onclick="app.actions.toggleExercise('${state.selectedDay}', ${idx})" class="group p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${ex.completed ? 'bg-green-900/10 border-green-900/30' : 'bg-neutral-800/50 border-neutral-800 hover:border-neutral-600'}">
                        <div>
                            <div class="font-bold text-sm ${ex.completed ? 'text-green-500 line-through decoration-green-500/50' : 'text-white'} flex items-center">
                                ${finalName}
                                ${isSwapped ? `<span class="ml-2 text-[8px] bg-red-900/50 text-red-200 px-1.5 py-0.5 rounded uppercase tracking-wider font-black">SWAP: ${swapReason}</span>` : ''}
                            </div>
                            <div class="text-xs text-neutral-500 mt-1 font-mono">${phaseData.reps}</div>
                        </div>
                        <div class="w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${ex.completed ? 'border-green-500 bg-green-500' : 'border-neutral-700 group-hover:border-neutral-500'}">
                            ${ex.completed ? '<i data-lucide="check" class="w-3.5 h-3.5 text-black stroke-[3px]"></i>' : ''}
                        </div>
                    </div>`;
                }).join('');
            }

            return `
            <div class="h-full flex flex-col pb-32 animate-slide-up">
                <!-- Day Selector -->
                <div class="overflow-x-auto whitespace-nowrap px-5 py-4 custom-scrollbar border-b border-neutral-800">
                    <div class="flex space-x-2 pb-2">${daysHTML}</div>
                </div>

                <!-- Workout Card -->
                <div class="flex-1 overflow-y-auto custom-scrollbar px-5 pb-5 pt-4">
                    <div class="mb-6">
                        <div class="flex justify-between items-end mb-2">
                            <h2 class="text-3xl font-black text-white italic uppercase tracking-tighter">${state.selectedDay}</h2>
                            <span class="text-[10px] font-bold text-red-400 bg-red-900/20 border border-red-900/30 px-2 py-1 rounded uppercase tracking-wider">${workout.focus}</span>
                        </div>
                        <p class="text-neutral-400 text-sm mb-6 font-medium border-l-2 border-red-600 pl-3">${workout.title}</p>
                        <div class="space-y-3">${exercisesHTML}</div>
                    </div>
                    <!-- Spacer -->
                    <div class="h-16"></div>
                </div>
            </div>`;
        },

        fuel: () => {
            let recipesHTML = state.recipes
                .filter(r => state.recipeFilter === 'All' || r.type === state.recipeFilter)
                .map(r => `
                <div class="bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 hover:border-neutral-700 transition-all">
                    <div class="bg-neutral-800/50 p-3 border-b border-neutral-800 flex justify-between items-center">
                        <span class="font-bold text-white text-sm">${r.title}</span>
                        <div class="flex items-center space-x-1.5">
                            <span class="text-[10px] font-mono text-neutral-400">${r.calories} kcal</span>
                            <i data-lucide="flame" class="w-3.5 h-3.5 text-orange-500"></i>
                        </div>
                    </div>
                    <div class="p-4">
                        <ul class="space-y-1.5">
                            ${r.ingredients.map(i => `<li class="text-xs text-neutral-300 flex items-center"><div class="w-1 h-1 bg-red-500 rounded-full mr-2"></div>${i}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `).join('');

            let filtersHTML = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Shake'].map(f => `
                <button onclick="app.actions.setRecipeFilter('${f}')" class="flex-shrink-0 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wide border transition-all ${state.recipeFilter === f ? 'bg-white text-black border-white' : 'bg-transparent text-neutral-500 border-neutral-800 hover:border-neutral-600'}">${f}</button>
            `).join('');

            return `
            <div class="h-full overflow-y-auto custom-scrollbar p-5 space-y-6 pb-32 animate-slide-right">
                <!-- Water -->
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

                <div>
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-white font-bold flex items-center text-sm tracking-wide"><i data-lucide="chef-hat" class="w-4 h-4 mr-2 text-red-500"></i> RECIPE BOOK</h3>
                        <button onclick="app.openModal('addRecipe')" class="bg-neutral-800 hover:bg-neutral-700 p-2 rounded-full transition-colors border border-neutral-700"><i data-lucide="plus" class="w-4 h-4 text-white"></i></button>
                    </div>
                    <div class="flex gap-2 overflow-x-auto pb-4 custom-scrollbar">${filtersHTML}</div>
                    <div class="space-y-4">${recipesHTML}</div>
                </div>
            </div>`;
        },

        tech: () => {
            const currentWorkouts = phases[state.currentPhase === 'recovery' ? 1 : state.currentPhase].workouts;
            const dayExercises = currentWorkouts[state.selectedDay]?.exercises || [];
            
            // Logic to fetch tech info
            const relevantTech = dayExercises.map(ex => {
                // Find if this specific exercise is mentioned in tech library
                // For simplicity, we just look for cues by name match or standard
                const techMatch = techLibrary.find(t => t.name === ex.name);
                return techMatch || { name: ex.name, cues: "Focus on perfect form and control.", alerts: [] };
            });

            let techHTML = relevantTech.length > 0 ? relevantTech.map((tech, idx) => `
                <button onclick="app.openModal('tech', ${idx})" class="w-full text-left bg-neutral-900 p-4 rounded-xl border border-neutral-800 hover:border-neutral-600 border-l-4 ${tech.alerts && tech.alerts.length > 0 ? 'border-l-red-500' : 'border-l-neutral-800'} transition-all flex justify-between items-center group mb-3">
                    <div>
                        <div class="font-bold text-white text-sm group-hover:text-red-400 transition-colors">${tech.name}</div>
                        <div class="flex gap-2 mt-2">
                            <span class="text-[10px] bg-neutral-800 text-neutral-400 px-2 py-1 rounded border border-neutral-700">${state.selectedDay}</span>
                            ${tech.alerts && tech.alerts.length > 0 ? '<span class="text-[10px] bg-red-900/20 text-red-400 px-2 py-1 rounded border border-red-900/50 flex items-center"><i data-lucide="alert-triangle" class="w-3 h-3 mr-1"></i> Injury Focus</span>' : ''}
                        </div>
                    </div>
                    <i data-lucide="chevron-right" class="w-5 h-5 text-neutral-600 group-hover:text-white"></i>
                </button>
            `).join('') : '<div class="text-center py-10 text-neutral-500 text-xs italic">No tech cards available for this day.</div>';

            return `
            <div class="h-full flex flex-col p-5 pb-32 animate-fade-in">
                <div class="mb-5">
                    <h2 class="text-white font-bold text-xl mb-1">Tech Library</h2>
                    <p class="text-neutral-400 text-xs">Based on current training day.</p>
                </div>
                <div class="overflow-y-auto flex-1 custom-scrollbar -mr-2 pr-2">
                    ${techHTML}
                    <div class="h-10"></div>
                </div>
            </div>`;
        }
    },

    // --- ACTIONS ---
    actions: {
        toggleFuelItem: (key) => { state.fuelLog.items[key] = !state.fuelLog.items[key]; app.render(); },
        adjustWater: (amount) => { state.fuelLog.water = Math.max(0, state.fuelLog.water + amount); app.render(); },
        selectDay: (day) => { state.selectedDay = day; app.render(); },
        toggleExercise: (day, idx) => { state.workouts[day].exercises[idx].completed = !state.workouts[day].exercises[idx].completed; app.render(); },
        
        setPhase: (p) => { 
            state.currentPhase = p === 'recovery' ? 'recovery' : parseInt(p);
            // Refresh logic to apply to UI
            app.render(); 
        },
        
        setRecipeFilter: (f) => { state.recipeFilter = f; app.render(); },
        
        // --- ONBOARDING ACTIONS ---
        updateSetupInjuryDropdown: () => {
            const part = document.getElementById('setup-injury-part').value;
            const issueSelect = document.getElementById('setup-injury-issue');
            issueSelect.innerHTML = '<option value="">Select Issue</option>';
            if (injuryDatabase[part]) {
                injuryDatabase[part].forEach(issue => {
                    const opt = document.createElement('option');
                    opt.value = issue;
                    opt.text = issue;
                    issueSelect.add(opt);
                });
            }
        },
        addSetupInjury: () => {
            const part = document.getElementById('setup-injury-part').value;
            const issue = document.getElementById('setup-injury-issue').value;
            if (part && issue) {
                state.onboardingInjuries.push({ part, issue });
                // Render list
                const list = document.getElementById('setup-injury-list');
                const div = document.createElement('div');
                div.className = "flex justify-between items-center bg-neutral-950 p-2 rounded border border-neutral-800 text-xs text-neutral-300";
                div.innerHTML = `<span>${part}: ${issue}</span>`;
                list.appendChild(div);
            }
        },
        finishOnboarding: () => {
            const weight = document.getElementById('setup-weight').value;
            const diet = document.getElementById('setup-diet').value;
            
            // Goals
            const gPhys = document.getElementById('setup-goal-physique').value;
            const gStr = document.getElementById('setup-goal-strength').value;
            const gPerf = document.getElementById('setup-goal-perf').value;
            
            const duration = document.getElementById('setup-duration').value;

            if(!weight) return alert("Please enter weight.");

            state.stats = {
                weight, diet, duration,
                goals: { physique: gPhys || "N/A", strength: gStr || "N/A", performance: gPerf || "N/A" },
                injuries: state.onboardingInjuries
            };

            localStorage.setItem('coachOS_user_v2', JSON.stringify(state.stats));
            document.getElementById('onboarding-layer').classList.add('hidden');
            app.render();
        },

        // --- PROFILE MODAL ACTIONS ---
        updateInjuryDropdown: () => {
            const part = document.getElementById('injury-part').value;
            const issueSelect = document.getElementById('injury-issue');
            issueSelect.innerHTML = '<option value="">Select Issue</option>';
            if (injuryDatabase[part]) {
                injuryDatabase[part].forEach(issue => {
                    const opt = document.createElement('option');
                    opt.value = issue;
                    opt.text = issue;
                    issueSelect.add(opt);
                });
            }
        },
        addInjury: () => {
            const part = document.getElementById('injury-part').value;
            const issue = document.getElementById('injury-issue').value;
            const detail = document.getElementById('injury-detail').value;
            if(part && issue) {
                state.stats.injuries.push({ part, issue: detail ? `${issue} (${detail})` : issue });
                app.openModal('profile');
            }
        },
        removeInjury: (idx) => {
            state.stats.injuries.splice(idx, 1);
            app.openModal('profile');
        },
        saveProfile: () => {
            const inputs = document.querySelectorAll('#profile-form input');
            state.stats.weight = inputs[0].value;
            state.stats.squat = inputs[1].value;
            state.stats.speed = inputs[2].value;
            state.stats.vertical = inputs[3].value;
            
            state.stats.goals.physique = document.getElementById('goal-physique').value;
            state.stats.goals.strength = document.getElementById('goal-strength').value;
            state.stats.goals.performance = document.getElementById('goal-perf').value;

            // Save to LS
            localStorage.setItem('coachOS_user_v2', JSON.stringify(state.stats));
            
            app.closeModal();
            app.render();
        },
        addRecipe: () => {
            const name = document.getElementById('new-recipe-name').value;
            const type = document.getElementById('new-recipe-type').value;
            const cals = document.getElementById('new-recipe-cals').value;
            const ings = document.getElementById('new-recipe-ings').value;
            if(name) {
                state.recipes.push({
                    id: Date.now(), type, title: name, calories: cals,
                    ingredients: ings.split(',').map(i => i.trim())
                });
                app.closeModal();
                app.render();
            }
        }
    },

    // --- MODALS ---
    openModal: (type, data) => {
        const layer = document.getElementById('modal-layer');
        let content = '';

        if (type === 'profile') {
            const injList = state.stats.injuries.map((inj, idx) => `
                <div class="flex justify-between items-center bg-neutral-800 p-2 rounded text-xs mb-2">
                    <span class="text-neutral-300">${inj.part}: ${inj.issue}</span>
                    <button onclick="app.actions.removeInjury(${idx})" class="text-red-500"><i data-lucide="x" class="w-3 h-3"></i></button>
                </div>
            `).join('');

            content = `
            <div class="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in z-50 overflow-y-auto" onclick="if(event.target === this) app.closeModal()">
                <div class="bg-neutral-900 w-full max-w-sm rounded-2xl border border-neutral-700 shadow-2xl overflow-hidden animate-slide-up my-auto">
                    <div class="p-4 border-b border-neutral-800 flex justify-between items-center bg-neutral-900 sticky top-0">
                        <h3 class="font-bold text-white flex items-center"><i data-lucide="settings-2" class="w-4 h-4 mr-2 text-red-500"></i> CONFIGURATION</h3>
                        <button onclick="app.closeModal()"><i data-lucide="x" class="w-5 h-5 text-neutral-400"></i></button>
                    </div>
                    <div class="p-5 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar" id="profile-form">
                        
                        <!-- Stats Section -->
                        <div>
                            <div class="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-3">CURRENT STATS</div>
                            <div class="grid grid-cols-2 gap-3">
                                <div><label class="text-[9px] text-neutral-400 block mb-1">WEIGHT (LBS)</label><input type="number" value="${state.stats.weight}" class="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-white font-mono text-sm"></div>
                                <div><label class="text-[9px] text-neutral-400 block mb-1">SQUAT (LBS)</label><input type="number" value="${state.stats.squat}" class="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-white font-mono text-sm"></div>
                                <div><label class="text-[9px] text-neutral-400 block mb-1">SPEED (40YD)</label><input type="number" value="${state.stats.speed}" class="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-white font-mono text-sm"></div>
                                <div><label class="text-[9px] text-neutral-400 block mb-1">VERT (IN)</label><input type="number" value="${state.stats.vertical}" class="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-white font-mono text-sm"></div>
                            </div>
                        </div>

                        <!-- Goals Section -->
                        <div>
                            <div class="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-3">TARGET GOALS</div>
                            <div class="space-y-3">
                                <div><label class="text-[9px] text-neutral-400 block mb-1">PHYSIQUE GOAL</label><input id="goal-physique" type="text" value="${state.stats.goals.physique}" class="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-white text-xs"></div>
                                <div><label class="text-[9px] text-neutral-400 block mb-1">STRENGTH GOAL</label><input id="goal-strength" type="text" value="${state.stats.goals.strength}" class="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-white text-xs"></div>
                                <div><label class="text-[9px] text-neutral-400 block mb-1">PERFORMANCE GOAL</label><input id="goal-perf" type="text" value="${state.stats.goals.performance}" class="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-white text-xs"></div>
                            </div>
                        </div>

                        <!-- Injury Builder -->
                        <div>
                            <div class="text-[10px] font-bold text-red-500 uppercase tracking-widest mb-3">INJURY PROTOCOL</div>
                            <div class="bg-neutral-950 p-3 rounded-lg border border-neutral-800 mb-3">
                                <div class="grid grid-cols-2 gap-2 mb-2">
                                    <select id="injury-part" onchange="app.actions.updateInjuryDropdown()" class="bg-neutral-900 text-white text-xs p-2 rounded border border-neutral-800">
                                        <option value="">Body Part</option>
                                        ${Object.keys(injuryDatabase).map(k => `<option value="${k}">${k}</option>`).join('')}
                                    </select>
                                    <select id="injury-issue" class="bg-neutral-900 text-white text-xs p-2 rounded border border-neutral-800">
                                        <option value="">Issue</option>
                                    </select>
                                </div>
                                <input id="injury-detail" placeholder="Side (Left/Right) or Notes" class="w-full bg-neutral-900 text-white text-xs p-2 rounded border border-neutral-800 mb-2">
                                <button onclick="app.actions.addInjury()" class="w-full bg-red-900/30 text-red-400 border border-red-900/50 hover:bg-red-900/50 text-xs font-bold py-2 rounded">ADD INJURY ALERT</button>
                            </div>
                            <div class="space-y-1">
                                ${injList || '<div class="text-neutral-600 text-xs italic text-center">No active injuries reported.</div>'}
                            </div>
                        </div>

                        <button onclick="app.actions.saveProfile()" class="w-full bg-white text-black font-black py-3 rounded-lg tracking-wide hover:bg-neutral-200">UPDATE SYSTEM</button>
                    </div>
                </div>
            </div>`;
        } else if (type === 'addRecipe') {
            content = `
            <div class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 animate-fade-in z-50" onclick="if(event.target === this) app.closeModal()">
                <div class="bg-neutral-900 w-full max-w-sm rounded-2xl border border-neutral-700 shadow-2xl overflow-hidden animate-slide-up">
                    <div class="p-4 border-b border-neutral-800 flex justify-between items-center">
                        <h3 class="font-bold text-white">Add New Fuel</h3>
                        <button onclick="app.closeModal()"><i data-lucide="x" class="w-5 h-5 text-neutral-400"></i></button>
                    </div>
                    <div class="p-4 space-y-3">
                        <input id="new-recipe-name" placeholder="Recipe Name" class="w-full bg-neutral-800 p-3 rounded-lg text-white border border-neutral-700 text-sm">
                        <div class="flex gap-2">
                            <select id="new-recipe-type" class="bg-neutral-800 p-3 rounded-lg text-white border border-neutral-700 flex-1 text-sm">
                                <option>Breakfast</option><option>Lunch</option><option>Dinner</option><option>Shake</option>
                            </select>
                            <input id="new-recipe-cals" placeholder="Cals" type="number" class="w-24 bg-neutral-800 p-3 rounded-lg text-white border border-neutral-700 text-sm">
                        </div>
                        <textarea id="new-recipe-ings" placeholder="Ingredients (comma separated)" class="w-full bg-neutral-800 p-3 rounded-lg text-white border border-neutral-700 h-24 resize-none text-sm"></textarea>
                        <button onclick="app.actions.addRecipe()" class="w-full bg-white text-black font-bold py-3 rounded-lg">ADD TO DATABASE</button>
                    </div>
                </div>
            </div>`;
        } else if (type === 'tech') {
            const currentWorkouts = phases[state.currentPhase === 'recovery' ? 1 : state.currentPhase].workouts;
            const dayExercises = currentWorkouts[state.selectedDay]?.exercises || [];
            
            // Logic handled in render tech, just need data for modal here
            // Re-find tech card data
            const relevantTech = dayExercises.map(ex => {
                const techMatch = techLibrary.find(t => t.name === ex.name);
                return techMatch || { name: ex.name, cues: "Focus on perfect form and control.", alerts: [] };
            });
            const tech = relevantTech[data];

            content = `
            <div class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 animate-fade-in z-50" onclick="if(event.target === this) app.closeModal()">
                <div class="bg-neutral-900 w-full max-w-md rounded-2xl border border-neutral-700 shadow-2xl overflow-hidden animate-slide-up">
                    <div class="p-5 border-b border-neutral-800 flex justify-between items-start bg-neutral-900">
                        <div>
                            <h3 class="text-xl font-black text-white uppercase italic tracking-tighter">${tech.name}</h3>
                            <p class="text-xs text-neutral-400 mt-1">Tech Specification Card</p>
                        </div>
                        <button onclick="app.closeModal()" class="p-1 hover:bg-neutral-800 rounded-full"><i data-lucide="x" class="w-6 h-6 text-neutral-400"></i></button>
                    </div>
                    <div class="p-6 space-y-6">
                        <div>
                            <div class="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-2">Primary Cues</div>
                            <p class="text-neutral-200 text-sm leading-relaxed border-l-2 border-blue-500 pl-3">"${tech.cues}"</p>
                        </div>
                        ${tech.alerts && tech.alerts.length > 0 ? `
                        <div>
                            <div class="text-[10px] font-bold text-red-500 uppercase tracking-widest mb-2 flex items-center"><i data-lucide="alert-triangle" class="w-3 h-3 mr-1"></i> Injury Override</div>
                            <div class="space-y-2">
                                ${tech.alerts.map(a => `<div class="bg-red-900/10 border border-red-900/30 p-3 rounded-lg flex items-center"><span class="text-red-400 font-bold text-xs block">${a} Focus</span></div>`).join('')}
                            </div>
                        </div>` : ''}
                    </div>
                </div>
            </div>`;
        }

        layer.innerHTML = content;
        lucide.createIcons();
    },

    closeModal: () => {
        document.getElementById('modal-layer').innerHTML = '';
    }
};

// --- INIT ---
window.onload = app.init;


