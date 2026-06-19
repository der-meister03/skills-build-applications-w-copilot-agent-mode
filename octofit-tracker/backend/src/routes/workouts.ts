import express, { Request, Response } from 'express';
import Workout from '../models/Workout';

const router = express.Router();

// Create a new workout
router.post('/', async (req: Request, res: Response) => {
  try {
    const { userId, title, description, duration, caloriesBurned, exerciseType, date } = req.body;

    if (!userId || !title || !duration || caloriesBurned === undefined) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newWorkout = new Workout({
      userId,
      title,
      description,
      duration,
      caloriesBurned,
      exerciseType,
      date: date || new Date(),
    });

    await newWorkout.save();
    res.status(201).json({
      message: 'Workout created successfully',
      workout: newWorkout,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get all workouts for a user
router.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    const workouts = await Workout.find({ userId: req.params.userId }).sort({ date: -1 });
    res.json(workouts);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get workout by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    res.json(workout);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Update workout
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { title, description, duration, caloriesBurned, exerciseType, date } = req.body;
    const workout = await Workout.findByIdAndUpdate(
      req.params.id,
      { title, description, duration, caloriesBurned, exerciseType, date },
      { new: true, runValidators: true }
    );

    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    res.json({ message: 'Workout updated successfully', workout });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Delete workout
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const workout = await Workout.findByIdAndDelete(req.params.id);
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    res.json({ message: 'Workout deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
