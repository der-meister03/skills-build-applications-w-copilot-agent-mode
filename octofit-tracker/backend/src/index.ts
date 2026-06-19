import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/users';
import workoutRoutes from './routes/workouts';
import goalRoutes from './routes/goals';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit-tracker';

// Middleware
app.use(express.json());

// MongoDB Connection
async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    process.exit(1);
  }
}

// Routes
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to OctoFit Tracker API' });
});

app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'OctoFit Tracker API is running' });
});

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/goals', goalRoutes);

// 404 Handler
app.use(notFoundHandler);

// Error Handler
app.use(errorHandler);

// Start Server
async function startServer() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🐙 OctoFit Tracker Backend running on http://localhost:${PORT}`);
    console.log(`📋 API Documentation:`);
    console.log(`   GET  /api/health - Health check`);
    console.log(`   GET  /api/users - List all users`);
    console.log(`   POST /api/users - Create new user`);
    console.log(`   GET  /api/workouts/user/:userId - Get user workouts`);
    console.log(`   POST /api/workouts - Create new workout`);
    console.log(`   GET  /api/goals/user/:userId - Get user goals`);
    console.log(`   POST /api/goals - Create new goal`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
