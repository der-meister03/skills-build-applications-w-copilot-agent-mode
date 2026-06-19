import express, { Request, Response } from 'express';
import Goal from '../models/Goal';

const router = express.Router();

// Create a new goal
router.post('/', async (req: Request, res: Response) => {
  try {
    const { userId, title, description, targetValue, metric, deadline } = req.body;

    if (!userId || !title || !targetValue || !metric || !deadline) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newGoal = new Goal({
      userId,
      title,
      description,
      targetValue,
      metric,
      deadline,
    });

    await newGoal.save();
    res.status(201).json({
      message: 'Goal created successfully',
      goal: newGoal,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get all goals for a user
router.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    const goals = await Goal.find({ userId: req.params.userId }).sort({ deadline: 1 });
    res.json(goals);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get goal by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const goal = await Goal.findById(req.params.id);
    if (!goal) {
      return res.status(404).json({ error: 'Goal not found' });
    }
    res.json(goal);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Update goal
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { title, description, targetValue, currentValue, metric, deadline, completed } = req.body;
    const goal = await Goal.findByIdAndUpdate(
      req.params.id,
      { title, description, targetValue, currentValue, metric, deadline, completed },
      { new: true, runValidators: true }
    );

    if (!goal) {
      return res.status(404).json({ error: 'Goal not found' });
    }
    res.json({ message: 'Goal updated successfully', goal });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Delete goal
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const goal = await Goal.findByIdAndDelete(req.params.id);
    if (!goal) {
      return res.status(404).json({ error: 'Goal not found' });
    }
    res.json({ message: 'Goal deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
