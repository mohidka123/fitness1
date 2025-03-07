// DOM Elements
const navLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('section');
const updateStatsBtn = document.getElementById('update-stats');
const stepsCount = document.getElementById('steps-count');
const caloriesCount = document.getElementById('calories-count');
const waterCount = document.getElementById('water-count');
const workoutList = document.getElementById('workout-list');
const startWorkoutBtn = document.getElementById('start-workout');
const workoutContainer = document.getElementById('workout-container');
const foodForm = document.getElementById('food-form');
const foodLog = document.getElementById('food-log').querySelector('tbody');
const totalCalories = document.getElementById('total-calories');
const totalProtein = document.getElementById('total-protein');
const totalCarbs = document.getElementById('total-carbs');
const totalFat = document.getElementById('total-fat');
const progressForm = document.getElementById('progress-form');
const startJourneyBtn = document.getElementById('start-journey');
const timerDisplay = document.querySelector('.timer-display');
const pauseBtn = document.querySelector('.pause-btn');
const progressChart = document.querySelector('.progress-chart');
const splashScreen = document.querySelector('.splash-screen');

// DOM Elements and State Management
const state = {
    currentWorkout: null,
    workoutTimer: null,
    isTimerRunning: false,
    workoutSeconds: 0,
    dailyNutrition: {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0
    },
    nutritionGoals: {
        calories: 2400,
        protein: 180,
        carbs: 300,
        fat: 80
    },
    user: {
        name: 'MICHAEL BERNANDO',
        steps: 8059,
        calories: 3115,
        heartRate: 123
    },
    weeklyCalories: [
        { day: 'SUN', value: 2800 },
        { day: 'MON', value: 3200 },
        { day: 'TUE', value: 3500 },
        { day: 'WED', value: 2900 },
        { day: 'THU', value: 3100 },
        { day: 'FRI', value: 3300 },
        { day: 'SAT', value: 2700 }
    ]
};

// Stats tracking
let stats = {
    steps: 0,
    calories: 0,
    bpm: 0,
    totalCalories: 0
};

// Activity levels for calorie calculation
const activityLevels = {
    resting: 1.2,  // Resting/minimal activity
    light: 1.375,  // Light exercise
    moderate: 1.55 // Moderate exercise
};

// Function to update stats display with animation
function updateStatsDisplay() {
    const elements = {
        steps: document.querySelector('.stat-card:nth-child(1) .stat-value'),
        calories: document.querySelector('.stat-card:nth-child(2) .stat-value'),
        bpm: document.querySelector('.stat-card:nth-child(3) .stat-value'),
        totalCalories: document.querySelector('.stat-card:nth-child(4) .stat-value')
    };

    // Update values and trigger animations
    Object.entries(stats).forEach(([key, value]) => {
        const element = elements[key];
        if (element) {
            const oldValue = parseInt(element.textContent.replace(/,/g, '')) || 0;
            const newValue = Math.round(value);
            
            // Only animate if value has changed
            if (oldValue !== newValue) {
                element.textContent = newValue.toLocaleString();
                element.classList.remove('pulse');
                void element.offsetWidth; // Trigger reflow
                element.classList.add('pulse');
            }
        }
    });
}

// Function to calculate calories burned
function calculateCaloriesBurned(steps, duration) {
    const MET = 3.5; // Metabolic Equivalent for walking
    const weight = 70; // Average weight in kg
    const caloriesPerStep = 0.04;
    
    // Calculate calories from steps
    const stepCalories = steps * caloriesPerStep;
    
    // Calculate calories from activity level
    const activityLevel = steps > 0 ? activityLevels.light : activityLevels.resting;
    const baseCalories = (MET * weight * duration/3600) * activityLevel;
    
    return stepCalories + baseCalories;
}

// Function to simulate steps increase with natural variation
function updateSteps() {
    // Random step increase between 10-30 steps (more realistic range)
    const stepIncrease = Math.floor(Math.random() * 21) + 10;
    stats.steps += stepIncrease;
    
    // Update calories based on steps and activity
    const calorieIncrease = calculateCaloriesBurned(stepIncrease, 2);
    stats.calories += calorieIncrease;
    stats.totalCalories += calorieIncrease;
    
    updateStatsDisplay();
}

// Function to simulate heart rate changes with natural variation
function updateBPM() {
    if (stats.bpm === 0) {
        // Start at resting heart rate
        stats.bpm = 60;
    } else {
        // Calculate target BPM based on activity level
        const stepsPerMinute = (stats.steps / (Date.now() - startTime)) * 60000;
        const activityIntensity = Math.min(1, stepsPerMinute / 120); // 120 steps per minute as moderate intensity
        
        const targetBPM = 60 + (activityIntensity * 80); // Max BPM of 140 at highest intensity
        
        // Smooth transition to target BPM with natural variation
        const bpmDiff = targetBPM - stats.bpm;
        stats.bpm += bpmDiff * 0.1 + (Math.random() * 2 - 1);
        
        // Keep BPM within realistic bounds
        stats.bpm = Math.max(60, Math.min(140, stats.bpm));
    }
    
    updateStatsDisplay();
}

// Track session start time
const startTime = Date.now();

// Initialize real-time updates
function initializeStats() {
    // Reset all stats
    stats.steps = 0;
    stats.calories = 0;
    stats.bpm = 0;
    stats.totalCalories = 0;
    
    // Initial display update
    updateStatsDisplay();
    
    // Start updates with slight delays for natural feel
    setTimeout(() => {
        // Update BPM frequently for smooth changes
        setInterval(updateBPM, 500);
        
        // Update steps and calories every 2 seconds
        setInterval(updateSteps, 2000);
    }, 1000);
}

// Start the live updates when the page loads
document.addEventListener('DOMContentLoaded', initializeStats);

// Timer functionality
function updateTimer() {
    const minutes = Math.floor(state.workoutSeconds / 60);
    const seconds = state.workoutSeconds % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function toggleTimer() {
    if (state.isTimerRunning) {
        clearInterval(state.workoutTimer);
        pauseBtn.textContent = '▶';
    } else {
        state.workoutTimer = setInterval(() => {
            state.workoutSeconds++;
            updateTimer();
        }, 1000);
        pauseBtn.textContent = 'II';
    }
    state.isTimerRunning = !state.isTimerRunning;
}

// Navigation
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remove active class from all links and sections
        navLinks.forEach(link => link.classList.remove('active'));
        sections.forEach(section => section.classList.remove('active-section'));
        
        // Add active class to clicked link
        this.classList.add('active');
        
        // Show corresponding section
        const targetId = this.getAttribute('href').substring(1);
        document.getElementById(targetId).classList.add('active-section');
    });
});

// Update Stats
updateStatsBtn.addEventListener('click', function() {
    // Simulate updating stats with random values
    stepsCount.textContent = Math.floor(Math.random() * 10000);
    caloriesCount.textContent = Math.floor(Math.random() * 2000);
    waterCount.textContent = Math.floor(Math.random() * 8);
    
    // Save to local storage
    saveStats();
});

// Quick Workout
function displayQuickWorkouts() {
    workoutList.innerHTML = '';
    
    // Get a few random workouts from the workout data
    const quickWorkouts = getRandomItems(workoutData, 3);
    
    quickWorkouts.forEach(workout => {
        const li = document.createElement('li');
        li.textContent = workout.name;
        workoutList.appendChild(li);
    });
}

startWorkoutBtn.addEventListener('click', function() {
    alert('Starting workout session!');
    // Here you would implement the workout session functionality
});

// Workout Library
function displayWorkouts() {
    workoutContainer.innerHTML = '';
    
    workoutData.forEach(workout => {
        const workoutCard = document.createElement('div');
        workoutCard.className = 'workout-card';
        
        workoutCard.innerHTML = `
            <img src="${workout.image || 'https://via.placeholder.com/300x200?text=Workout'}" alt="${workout.name}">
            <div class="workout-card-content">
                <h3>${workout.name}</h3>
                <p>${workout.description}</p>
                <div class="tags">
                    ${workout.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <button class="view-workout-btn" data-id="${workout.id}">View Details</button>
            </div>
        `;
        
        workoutContainer.appendChild(workoutCard);
    });
    
    // Add event listeners to view workout buttons
    document.querySelectorAll('.view-workout-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const workoutId = this.getAttribute('data-id');
            const workout = workoutData.find(w => w.id === workoutId);
            
            if (workout) {
                alert(`Workout: ${workout.name}\nDuration: ${workout.duration} minutes\nDifficulty: ${workout.difficulty}`);
                // Here you would implement a modal or page to show workout details
            }
        });
    });
}

// Nutrition Tracker
foodForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const foodName = document.getElementById('food-name').value;
    const calories = parseInt(document.getElementById('calories').value);
    const protein = parseInt(document.getElementById('protein').value);
    const carbs = parseInt(document.getElementById('carbs').value);
    const fat = parseInt(document.getElementById('fat').value);
    
    addFoodToLog(foodName, calories, protein, carbs, fat);
    updateNutritionTotals();
    saveNutritionData();
    
    // Reset form
    this.reset();
});

function addFoodToLog(name, calories, protein, carbs, fat) {
    const row = document.createElement('tr');
    
    row.innerHTML = `
        <td>${name}</td>
        <td>${calories}</td>
        <td>${protein}</td>
        <td>${carbs}</td>
        <td>${fat}</td>
        <td><button class="delete-btn">Delete</button></td>
    `;
    
    // Add delete functionality
    row.querySelector('.delete-btn').addEventListener('click', function() {
        row.remove();
        updateNutritionTotals();
        saveNutritionData();
    });
    
    foodLog.appendChild(row);
}

function updateNutritionTotals() {
    let calories = 0;
    let protein = 0;
    let carbs = 0;
    let fat = 0;
    
    // Sum up all values from the food log
    const rows = foodLog.querySelectorAll('tr');
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        calories += parseInt(cells[1].textContent) || 0;
        protein += parseInt(cells[2].textContent) || 0;
        carbs += parseInt(cells[3].textContent) || 0;
        fat += parseInt(cells[4].textContent) || 0;
    });
    
    // Update totals
    totalCalories.textContent = calories;
    totalProtein.textContent = protein;
    totalCarbs.textContent = carbs;
    totalFat.textContent = fat;
}

// Progress Tracking
progressForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const weight = parseFloat(document.getElementById('weight').value);
    const date = document.getElementById('date').value;
    const notes = document.getElementById('notes').value;
    
    // Add to progress data
    progressData.push({
        date: date,
        weight: weight,
        notes: notes
    });
    
    saveProgressData();
    updateProgressCharts();
    
    // Reset form
    this.reset();
    
    alert('Progress saved successfully!');
});

function updateProgressCharts() {
    // This would use a charting library like Chart.js
    // For now, we'll just log the data
    console.log('Progress data updated:', progressData);
    
    // Example of how you might implement charts with Chart.js
    // if (weightChart && workoutChart) {
    //     updateWeightChart();
    //     updateWorkoutChart();
    // }
}

// Helper Functions
function getRandomItems(array, count) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// Local Storage Functions
function saveStats() {
    const stats = {
        steps: stepsCount.textContent,
        calories: caloriesCount.textContent,
        water: waterCount.textContent,
        date: new Date().toISOString().split('T')[0]
    };
    
    localStorage.setItem('fitnessStats', JSON.stringify(stats));
}

function loadStats() {
    const stats = JSON.parse(localStorage.getItem('fitnessStats'));
    
    if (stats && stats.date === new Date().toISOString().split('T')[0]) {
        stepsCount.textContent = stats.steps;
        caloriesCount.textContent = stats.calories;
        waterCount.textContent = stats.water;
    }
}

function saveNutritionData() {
    const nutritionData = [];
    
    const rows = foodLog.querySelectorAll('tr');
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        nutritionData.push({
            name: cells[0].textContent,
            calories: parseInt(cells[1].textContent),
            protein: parseInt(cells[2].textContent),
            carbs: parseInt(cells[3].textContent),
            fat: parseInt(cells[4].textContent)
        });
    });
    
    localStorage.setItem('nutritionData', JSON.stringify(nutritionData));
}

function loadNutritionData() {
    const nutritionData = JSON.parse(localStorage.getItem('nutritionData'));
    
    if (nutritionData) {
        foodLog.innerHTML = '';
        
        nutritionData.forEach(item => {
            addFoodToLog(item.name, item.calories, item.protein, item.carbs, item.fat);
        });
        
        updateNutritionTotals();
    }
}

function saveProgressData() {
    localStorage.setItem('progressData', JSON.stringify(progressData));
}

function loadProgressData() {
    const data = JSON.parse(localStorage.getItem('progressData'));
    
    if (data) {
        progressData = data;
        updateProgressCharts();
    }
}

// Start Journey Button
startJourneyBtn.addEventListener('click', () => {
    splashScreen.style.opacity = '0';
    setTimeout(() => {
        splashScreen.style.display = 'none';
        document.querySelector('a[href="#home"]').click();
    }, 500);
});

// Pause Button
pauseBtn.addEventListener('click', toggleTimer);

// Create weekly progress chart
function createWeeklyChart() {
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const values = [30, 45, 75, 45, 60, 45, 30];
    
    const chartHtml = days.map((day, index) => `
        <div class="chart-column">
            <div class="chart-bar" style="height: ${values[index]}%"></div>
            <div class="chart-label">${day}</div>
        </div>
    `).join('');
    
    progressChart.innerHTML = chartHtml;
}

// Display workout suggestions
function displayWorkoutSuggestions() {
    const workoutCards = document.querySelector('.workout-cards');
    const suggestions = workoutData.slice(0, 3); // Get first 3 workouts
    
    const cardsHtml = suggestions.map(workout => `
        <div class="workout-card">
            <img src="${workout.image}" alt="${workout.name}">
            <div class="workout-card-content">
                <h4>${workout.name.toUpperCase()}</h4>
                <p>${workout.duration} MIN</p>
            </div>
        </div>
    `).join('');
    
    workoutCards.innerHTML = cardsHtml;
}

// Display meal cards
function displayMealCards() {
    const mealCards = document.querySelector('.meal-cards');
    const meals = [
        { name: 'Breakfast', calories: 450, time: '8:30 AM' },
        { name: 'Lunch', calories: 650, time: '1:00 PM' },
        { name: 'Dinner', calories: 700, time: '7:00 PM' }
    ];
    
    const cardsHtml = meals.map(meal => `
        <div class="meal-card">
            <div class="meal-info">
                <h4>${meal.name}</h4>
                <p>${meal.calories} kcal</p>
                <span>${meal.time}</span>
            </div>
            <button class="edit-meal">Edit</button>
        </div>
    `).join('');
    
    mealCards.innerHTML = cardsHtml;
}

// Update progress bars
function updateProgressBars() {
    const goals = [
        { name: 'Calories', current: 1800, target: 2400 },
        { name: 'Protein', current: 120, target: 150 },
        { name: 'Carbs', current: 200, target: 300 },
        { name: 'Fat', current: 55, target: 80 }
    ];
    
    const goalProgress = document.querySelector('.goal-progress');
    
    const progressHtml = goals.map(goal => `
        <div class="goal">
            <span>${goal.name}</span>
            <div class="progress-bar">
                <div class="progress" style="width: ${(goal.current / goal.target) * 100}%"></div>
            </div>
            <span>${goal.current}/${goal.target}</span>
        </div>
    `).join('');
    
    goalProgress.innerHTML = progressHtml;
}

// Initialize Application
function initializeApp() {
    // Initialize UI
    updateUserStats();
    updateCaloriesChart();
    setupNavigation();
}

// Update User Statistics
function updateUserStats() {
    document.querySelector('.user-info h2').textContent = state.user.name;
    document.querySelectorAll('.stat-card').forEach(card => {
        const label = card.querySelector('.stat-label').textContent;
        const valueEl = card.querySelector('.stat-value');
        
        switch(label) {
            case 'STEPS':
                valueEl.textContent = state.user.steps.toLocaleString();
                break;
            case 'KCAL':
                valueEl.textContent = state.user.calories.toLocaleString();
                break;
            case 'BPM':
                valueEl.textContent = state.user.heartRate;
                break;
        }
    });
}

// Update Calories Chart
function updateCaloriesChart() {
    const maxCalories = Math.max(...state.weeklyCalories.map(day => day.value));
    const chartBars = document.querySelectorAll('.chart-bar');
    
    chartBars.forEach((bar, index) => {
        const dayData = state.weeklyCalories[index];
        const height = (dayData.value / maxCalories) * 100;
        bar.style.height = `${height}%`;
        
        // Set active day (Tuesday)
        if (dayData.day === 'TUE') {
            bar.classList.add('active');
        }
    });
}

// Setup Navigation
function setupNavigation() {
    const navLinks = document.querySelectorAll('.bottom-nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            link.classList.add('active');
            
            // Handle navigation
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Hide all sections
                document.querySelectorAll('section').forEach(section => {
                    section.style.display = 'none';
                    section.classList.remove('active-section');
                });
                
                // Show target section
                targetSection.style.display = 'block';
                targetSection.classList.add('active-section');
            }
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);

// Initialize Charts
function initializeCharts() {
    // Macro Chart
    const macroCtx = document.getElementById('macro-chart').getContext('2d');
    new Chart(macroCtx, {
        type: 'doughnut',
        data: {
            labels: ['Protein', 'Carbs', 'Fat'],
            datasets: [{
                data: [state.dailyNutrition.protein * 4, state.dailyNutrition.carbs * 4, state.dailyNutrition.fat * 9],
                backgroundColor: ['#E5FF44', '#FF6B6B', '#4ECDC4']
            }]
        },
        options: {
            cutout: '70%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { color: '#FFFFFF' }
                }
            }
        }
    });

    // Weight Progress Chart
    const weightCtx = document.getElementById('weight-chart').getContext('2d');
    new Chart(weightCtx, {
        type: 'line',
        data: {
            labels: progressData.map(entry => entry.date),
            datasets: [{
                label: 'Weight (kg)',
                data: progressData.map(entry => entry.weight),
                borderColor: '#E5FF44',
                tension: 0.4
            }]
        },
        options: {
            scales: {
                y: { grid: { color: 'rgba(255,255,255,0.1)' }, ticks: { color: '#FFFFFF' } },
                x: { grid: { color: 'rgba(255,255,255,0.1)' }, ticks: { color: '#FFFFFF' } }
            },
            plugins: {
                legend: { labels: { color: '#FFFFFF' } }
            }
        }
    });

    // Workout Frequency Chart
    const workoutCtx = document.getElementById('workout-chart').getContext('2d');
    new Chart(workoutCtx, {
        type: 'bar',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Workouts',
                data: [2, 1, 3, 1, 2, 0, 1],
                backgroundColor: '#E5FF44'
            }]
        },
        options: {
            scales: {
                y: { 
                    grid: { color: 'rgba(255,255,255,0.1)' }, 
                    ticks: { color: '#FFFFFF', stepSize: 1 }
                },
                x: { grid: { color: 'rgba(255,255,255,0.1)' }, ticks: { color: '#FFFFFF' } }
            },
            plugins: {
                legend: { labels: { color: '#FFFFFF' } }
            }
        }
    });
}

// Workout Section Functions
function displayWorkoutGrid() {
    const workoutGrid = document.querySelector('.workout-grid');
    const workouts = workoutData.slice(0, 6); // Display first 6 workouts

    const workoutHTML = workouts.map(workout => `
        <div class="workout-card" data-id="${workout.id}">
            <img src="${workout.image}" alt="${workout.name}">
            <div class="workout-card-content">
                <h4>${workout.name}</h4>
                <p>${workout.duration} MIN • ${workout.difficulty}</p>
                <div class="tags">
                    ${workout.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <button class="start-workout-btn" onclick="startWorkout('${workout.id}')">Start Workout</button>
            </div>
        </div>
    `).join('');

    workoutGrid.innerHTML = workoutHTML;
}

function startWorkout(workoutId) {
    state.currentWorkout = workoutData.find(w => w.id === workoutId);
    state.workoutSeconds = 0;
    updateTimer();
    document.querySelector('a[href="#workouts"]').click();
}

// Nutrition Section Functions
function updateNutritionGoals() {
    const goalProgress = document.querySelector('.goal-progress');
    const goals = [
        { name: 'Calories', current: state.dailyNutrition.calories, target: state.nutritionGoals.calories, unit: 'kcal' },
        { name: 'Protein', current: state.dailyNutrition.protein, target: state.nutritionGoals.protein, unit: 'g' },
        { name: 'Carbs', current: state.dailyNutrition.carbs, target: state.nutritionGoals.carbs, unit: 'g' },
        { name: 'Fat', current: state.dailyNutrition.fat, target: state.nutritionGoals.fat, unit: 'g' }
    ];

    const goalsHTML = goals.map(goal => `
        <div class="goal">
            <div class="goal-label">
                <span>${goal.name}</span>
                <span>${goal.current}/${goal.target}${goal.unit}</span>
            </div>
            <div class="progress-bar">
                <div class="progress" style="width: ${(goal.current / goal.target) * 100}%"></div>
            </div>
        </div>
    `).join('');

    goalProgress.innerHTML = goalsHTML;
}

function displayMealCards() {
    const mealGrid = document.querySelector('.meal-grid');
    const meals = [
        { name: 'Breakfast', time: '8:30 AM', calories: 450, protein: 35, carbs: 45, fat: 15 },
        { name: 'Lunch', time: '1:00 PM', calories: 650, protein: 40, carbs: 65, fat: 25 },
        { name: 'Dinner', time: '7:00 PM', calories: 550, protein: 45, carbs: 50, fat: 20 }
    ];

    const mealsHTML = meals.map(meal => `
        <div class="meal-card">
            <div class="meal-info">
                <h4>${meal.name}</h4>
                <p>${meal.calories} kcal</p>
                <span>${meal.time}</span>
            </div>
            <div class="meal-macros">
                <span>P: ${meal.protein}g</span>
                <span>C: ${meal.carbs}g</span>
                <span>F: ${meal.fat}g</span>
            </div>
            <button class="edit-meal">Edit</button>
        </div>
    `).join('');

    mealGrid.innerHTML = mealsHTML;
}

// Progress Section Functions
function handleProgressSubmit(e) {
    e.preventDefault();
    const weight = parseFloat(document.getElementById('weight').value);
    const date = document.getElementById('date').value;
    const notes = document.getElementById('notes').value;

    progressData.push({ date, weight, notes });
    saveProgressData();
    initializeCharts(); // Refresh charts
    e.target.reset();
} 