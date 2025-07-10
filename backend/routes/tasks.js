const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const auth = require('../middleware/auth');

router.use(auth);

router.get('/stats', async (req, res) => {
  try {
    const userId = req.user._id;
    const total = await Task.countDocuments({ user: userId });
    const completed = await Task.countDocuments({ user: userId, status: 'completed' });
    const overdue = await Task.countDocuments({
      user: userId,
      dueDate: { $lt: new Date() },
      status: { $ne: 'completed' }
    });
    const byStatus = await Task.aggregate([
      { $match: { user: userId } },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    const byPriority = await Task.aggregate([
      { $match: { user: userId } },
      { $group: { _id: '$priority', count: { $sum: 1 } } }
    ]);
    res.json({
      data: {
        total,
        completed,
        overdue,
        byStatus: Object.fromEntries(byStatus.map(s => [s._id, s.count])),
        byPriority: Object.fromEntries(byPriority.map(p => [p._id, p.count])),
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch stats' });
  }
});

// Get all tasks (with pagination)
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build filter object
    const filter = { user: req.user._id };
    if (req.query.status) filter.status = req.query.status;
    if (req.query.priority) filter.priority = req.query.priority;
    if (req.query.search) {
      filter.title = { $regex: req.query.search, $options: 'i' };
    }

    // Sorting
    const sortBy = req.query.sortBy || 'createdAt';
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
    const sort = { [sortBy]: sortOrder };

    const tasks = await Task.find(filter)
      .skip(skip)
      .limit(limit)
      .sort(sort);

    const totalTasks = await Task.countDocuments(filter);

    res.json({
      data: tasks,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalTasks / limit),
        totalTasks,
        hasNext: page * limit < totalTasks,
        hasPrev: page > 1,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch tasks' });
  }
});

// Create a new task
router.post('/', async (req, res) => {
  try {
    // If using authentication middleware, req.user should be set
    const userId = req.user ? req.user._id : null;
    if (!userId) {
      return res.status(400).json({ message: 'User not authenticated' });
    }
    const newTask = await Task.create({ ...req.body, user: userId });
    res.status(201).json({ data: newTask });
  } catch (err) {
    console.error('Create task error:', err);
    res.status(500).json({ message: 'Failed to create task' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error('Delete task error:', err);
    res.status(500).json({ message: 'Failed to delete task' });
  }
});

// Update a task by ID (mark as completed, edit, etc.)
router.put('/:id', async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ data: updatedTask });
  } catch (err) {
    console.error('Update task error:', err);
    res.status(500).json({ message: 'Failed to update task' });
  }
});

module.exports = router;