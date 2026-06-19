import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User';
import Workout from './models/Workout';
import Goal from './models/Goal';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit-tracker';

const sampleUsers = [
  {
    username: 'alex_runner',
    email: 'alex@example.com',
    password: 'password123',
  },
  {
    username: 'jordan_strength',
    email: 'jordan@example.com',
    password: 'password123',
  },
  {
    username: 'sam_yogi',
    email: 'sam@example.com',
    password: 'password123',
  },
];

const sampleWorkouts = [
  {
    title: 'Morning Run',
    description: 'Easy pace 5K run',
    duration: 30,
    caloriesBurned: 300,
    exerciseType: 'cardio',
    date: new Date('2026-06-15'),
  },
  {
    title: 'Chest and Triceps',
    description: 'Upper body strength training',
    duration: 60,
    caloriesBurned: 400,
    exerciseType: 'strength',
    date: new Date('2026-06-16'),
  },
  {
    title: 'Yoga Session',
    description: 'Relaxing flow yoga',
    duration: 45,
    caloriesBurned: 150,
    exerciseType: 'flexibility',
    date: new Date('2026-06-17'),
  },
  {
    title: 'Basketball Game',
    description: 'Friendly basketball match',
    duration: 90,
    caloriesBurned: 600,
    exerciseType: 'sports',
    date: new Date('2026-06-18'),
  },
  {
    title: 'Evening Swim',
    description: 'Lap swimming workout',
    duration: 40,
    caloriesBurned: 350,
    exerciseType: 'cardio',
    date: new Date('2026-06-19'),
  },
];

const sampleGoals = [
  {
    title: 'Complete 100 Workouts',
    description: 'Reach 100 workouts in 6 months',
    targetValue: 100,
    currentValue: 5,
    metric: 'workouts',
    deadline: new Date('2026-12-19'),
    completed: false,
  },
  {
    title: 'Burn 50,000 Calories',
    description: 'Total calories burned goal',
    targetValue: 50000,
    currentValue: 1800,
    metric: 'calories',
    deadline: new Date('2026-12-31'),
    completed: false,
  },
  {
    title: 'Run 500 Minutes',
    description: 'Total running time goal',
    targetValue: 500,
    currentValue: 120,
    metric: 'minutes',
    deadline: new Date('2026-12-19'),
    completed: false,
  },
  {
    title: 'Lose 10 Pounds',
    description: 'Weight loss target',
    targetValue: 10,
    currentValue: 2,
    metric: 'weight',
    deadline: new Date('2026-09-19'),
    completed: false,
  },
];

async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    process.exit(1);
  }
}

async function populateDatabase() {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Workout.deleteMany({});
    await Goal.deleteMany({});
    console.log('🧹 Cleared existing data');

    // Create users
    const createdUsers = await User.insertMany(sampleUsers);
    console.log(`👥 Created ${createdUsers.length} sample users`);

    // Create workouts for first user
    const workoutsWithUserId = sampleWorkouts.map((workout) => ({
      ...workout,
      userId: createdUsers[0]._id.toString(),
    }));
    const createdWorkouts = await Workout.insertMany(workoutsWithUserId);
    console.log(`💪 Created ${createdWorkouts.length} sample workouts`);

    // Create goals for first user
    const goalsWithUserId = sampleGoals.map((goal) => ({
      ...goal,
      userId: createdUsers[0]._id.toString(),
    }));
    const createdGoals = await Goal.insertMany(goalsWithUserId);
    console.log(`🎯 Created ${createdGoals.length} sample goals`);

    console.log('\n📊 Sample Data Summary:');
    console.log('Users:');
    createdUsers.forEach((user) => {
      console.log(`  - ${user.username} (${user.email})`);
    });

    console.log('\nWorkouts for alex_runner:');
    createdWorkouts.forEach((workout) => {
      console.log(`  - ${workout.title} (${workout.duration} min, ${workout.caloriesBurned} cal)`);
    });

    console.log('\nGoals for alex_runner:');
    createdGoals.forEach((goal) => {
      console.log(`  - ${goal.title} (${goal.currentValue}/${goal.targetValue} ${goal.metric})`);
    });

    console.log('\n✨ Database population complete!');
  } catch (error) {
    console.error('❌ Error populating database:', error);
  }
}

async function main() {
  await connectDB();
  await populateDatabase();
  await mongoose.disconnect();
  console.log('📴 Database connection closed');
}

main();
