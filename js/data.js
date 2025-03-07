// Sample workout data
const workoutData = [
    {
        id: 'w1',
        name: 'Full Body HIIT',
        description: 'High-intensity interval training that targets all major muscle groups.',
        duration: 30,
        difficulty: 'Intermediate',
        calories: 350,
        image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        tags: ['HIIT', 'Full Body', 'Cardio'],
        exercises: [
            { name: 'Jumping Jacks', duration: 60, rest: 15 },
            { name: 'Push-ups', duration: 45, rest: 15 },
            { name: 'Burpees', duration: 45, rest: 15 },
            { name: 'Mountain Climbers', duration: 45, rest: 15 },
            { name: 'Plank', duration: 60, rest: 30 },
            { name: 'Squat Jumps', duration: 45, rest: 15 },
            { name: 'Lunges', duration: 45, rest: 15 },
            { name: 'High Knees', duration: 60, rest: 30 }
        ]
    },
    {
        id: 'w2',
        name: 'Core Crusher',
        description: 'Intense core workout to strengthen your abs, obliques, and lower back.',
        duration: 20,
        difficulty: 'Beginner',
        calories: 200,
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        tags: ['Core', 'Abs', 'Strength'],
        exercises: [
            { name: 'Crunches', duration: 45, rest: 15 },
            { name: 'Plank', duration: 60, rest: 15 },
            { name: 'Russian Twists', duration: 45, rest: 15 },
            { name: 'Leg Raises', duration: 45, rest: 15 },
            { name: 'Mountain Climbers', duration: 45, rest: 15 },
            { name: 'Bicycle Crunches', duration: 45, rest: 15 },
            { name: 'Side Planks (Left)', duration: 30, rest: 0 },
            { name: 'Side Planks (Right)', duration: 30, rest: 15 }
        ]
    },
    {
        id: 'w3',
        name: 'Lower Body Blast',
        description: 'Focus on strengthening your legs, glutes, and lower body.',
        duration: 25,
        difficulty: 'Intermediate',
        calories: 280,
        image: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        tags: ['Legs', 'Glutes', 'Strength'],
        exercises: [
            { name: 'Squats', duration: 45, rest: 15 },
            { name: 'Lunges', duration: 45, rest: 15 },
            { name: 'Glute Bridges', duration: 45, rest: 15 },
            { name: 'Calf Raises', duration: 45, rest: 15 },
            { name: 'Squat Jumps', duration: 30, rest: 15 },
            { name: 'Wall Sit', duration: 60, rest: 15 },
            { name: 'Donkey Kicks (Left)', duration: 30, rest: 0 },
            { name: 'Donkey Kicks (Right)', duration: 30, rest: 15 }
        ]
    },
    {
        id: 'w4',
        name: 'Upper Body Strength',
        description: 'Build strength in your arms, chest, back, and shoulders.',
        duration: 25,
        difficulty: 'Advanced',
        calories: 250,
        image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        tags: ['Arms', 'Chest', 'Strength'],
        exercises: [
            { name: 'Push-ups', duration: 45, rest: 15 },
            { name: 'Tricep Dips', duration: 45, rest: 15 },
            { name: 'Plank Shoulder Taps', duration: 45, rest: 15 },
            { name: 'Superman', duration: 45, rest: 15 },
            { name: 'Diamond Push-ups', duration: 30, rest: 15 },
            { name: 'Arm Circles', duration: 30, rest: 15 },
            { name: 'Pike Push-ups', duration: 30, rest: 15 },
            { name: 'Plank', duration: 60, rest: 30 }
        ]
    },
    {
        id: 'w5',
        name: 'Cardio Burn',
        description: 'High-energy cardio workout to boost your heart rate and burn calories.',
        duration: 30,
        difficulty: 'Beginner',
        calories: 320,
        image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        tags: ['Cardio', 'Fat Burn', 'Endurance'],
        exercises: [
            { name: 'Jumping Jacks', duration: 60, rest: 15 },
            { name: 'High Knees', duration: 45, rest: 15 },
            { name: 'Butt Kicks', duration: 45, rest: 15 },
            { name: 'Jumping Rope', duration: 60, rest: 15 },
            { name: 'Lateral Jumps', duration: 45, rest: 15 },
            { name: 'Mountain Climbers', duration: 45, rest: 15 },
            { name: 'Burpees', duration: 30, rest: 15 },
            { name: 'Jumping Lunges', duration: 45, rest: 30 }
        ]
    },
    {
        id: 'w6',
        name: 'Yoga Flow',
        description: 'Gentle yoga sequence to improve flexibility, balance, and mindfulness.',
        duration: 40,
        difficulty: 'Beginner',
        calories: 150,
        image: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        tags: ['Yoga', 'Flexibility', 'Mindfulness'],
        exercises: [
            { name: 'Child\'s Pose', duration: 60, rest: 0 },
            { name: 'Downward Dog', duration: 60, rest: 0 },
            { name: 'Warrior I', duration: 45, rest: 0 },
            { name: 'Warrior II', duration: 45, rest: 0 },
            { name: 'Triangle Pose', duration: 45, rest: 0 },
            { name: 'Tree Pose', duration: 45, rest: 0 },
            { name: 'Bridge Pose', duration: 45, rest: 0 },
            { name: 'Corpse Pose', duration: 120, rest: 0 }
        ]
    }
];

// Sample nutrition data
const nutritionData = [
    {
        name: 'Chicken Breast',
        calories: 165,
        protein: 31,
        carbs: 0,
        fat: 3.6
    },
    {
        name: 'Brown Rice (1 cup)',
        calories: 216,
        protein: 5,
        carbs: 45,
        fat: 1.8
    },
    {
        name: 'Broccoli (1 cup)',
        calories: 55,
        protein: 3.7,
        carbs: 11.2,
        fat: 0.6
    },
    {
        name: 'Salmon (4 oz)',
        calories: 233,
        protein: 25,
        carbs: 0,
        fat: 15
    },
    {
        name: 'Sweet Potato (1 medium)',
        calories: 112,
        protein: 2,
        carbs: 26,
        fat: 0.1
    },
    {
        name: 'Greek Yogurt (1 cup)',
        calories: 130,
        protein: 22,
        carbs: 8,
        fat: 0
    },
    {
        name: 'Avocado (half)',
        calories: 160,
        protein: 2,
        carbs: 8.5,
        fat: 14.7
    },
    {
        name: 'Banana (1 medium)',
        calories: 105,
        protein: 1.3,
        carbs: 27,
        fat: 0.4
    },
    {
        name: 'Egg (1 large)',
        calories: 72,
        protein: 6.3,
        carbs: 0.4,
        fat: 5
    },
    {
        name: 'Oatmeal (1 cup cooked)',
        calories: 158,
        protein: 6,
        carbs: 27,
        fat: 3.2
    }
];

// Initialize progress data
let progressData = [
    {
        date: '2023-01-01',
        weight: 75.5,
        notes: 'Starting my fitness journey'
    },
    {
        date: '2023-01-08',
        weight: 74.8,
        notes: 'Feeling more energetic'
    },
    {
        date: '2023-01-15',
        weight: 74.2,
        notes: 'Completed all workouts this week'
    },
    {
        date: '2023-01-22',
        weight: 73.5,
        notes: 'Improved my diet'
    },
    {
        date: '2023-01-29',
        weight: 72.9,
        notes: 'Increased workout intensity'
    }
]; 