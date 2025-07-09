const Task = require('../models/Task');
const { sendSuccessResponse, sendErrorResponse, sendPaginatedResponse } = require('../utils/responseHelper');

// @desc    Get all tasks for the authenticated user
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res) => {
  try {
    const userId = req.user._id;
    const { 
      page = 1, 
      limit = 10, 
      status, 
      priority, 
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build query
    const query = { user: userId };
    
    if (status) {
      query.status = status;
    }
    
    if (priority) {
      query.priority = priority;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Calculate pagination
    const skip = (page - 1) * limit;
    const totalTasks = await Task.countDocuments(query);
    const totalPages = Math.ceil(totalTasks / limit);

    // Get tasks
    const tasks = await Task.find(query)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const pagination = {
      currentPage: parseInt(page),
      totalPages,
      totalTasks,
      hasNext: page < totalPages,
      hasPrev: page > 1
    };

    sendPaginatedResponse(res, 'Tasks retrieved successfully', tasks, pagination);
  } catch (error) {
    console.error('Get tasks error:', error);
    sendErrorResponse(res, 'Failed to retrieve tasks', 500);
  }
};

// @desc    Get single task by ID
// @route   GET /api/tasks/:id
// @access  Private
const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const task = await Task.findOne({ _id: id, user: userId });
    
    if (!task) {
      return sendErrorResponse(res, 'Task not found', 404);
    }

    sendSuccessResponse(res, 'Task retrieved successfully', task);
  } catch (error) {
    console.error('Get task error:', error);
    sendErrorResponse(res, 'Failed to retrieve task', 500);
  }
};

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;
    const userId = req.user._id;

    const task = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      user: userId
    });

    sendSuccessResponse(res, 'Task created successfully', task, 201);
  } catch (error) {
    console.error('Create task error:', error);
    sendErrorResponse(res, 'Failed to create task', 500);
  }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, priority, dueDate } = req.body;
    const userId = req.user._id;

    const task = await Task.findOne({ _id: id, user: userId });
    
    if (!task) {
      return sendErrorResponse(res, 'Task not found', 404);
    }

    // Update fields
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined) task.status = status;
    if (priority !== undefined) task.priority = priority;
    if (dueDate !== undefined) task.dueDate = dueDate ? new Date(dueDate) : null;

    await task.save();

    sendSuccessResponse(res, 'Task updated successfully', task);
  } catch (error) {
    console.error('Update task error:', error);
    sendErrorResponse(res, 'Failed to update task', 500);
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const task = await Task.findOneAndDelete({ _id: id, user: userId });
    
    if (!task) {
      return sendErrorResponse(res, 'Task not found', 404);
    }

    sendSuccessResponse(res, 'Task deleted successfully');
  } catch (error) {
    console.error('Delete task error:', error);
    sendErrorResponse(res, 'Failed to delete task', 500);
  }
};

// @desc    Get task statistics
// @route   GET /api/tasks/stats
// @access  Private
const getTaskStats = async (req, res) => {
  try {
    const userId = req.user._id;

    const stats = await Task.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const priorityStats = await Task.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: '$priority',
          count: { $sum: 1 }
        }
      }
    ]);

    const totalTasks = await Task.countDocuments({ user: userId });
    const completedTasks = await Task.countDocuments({ user: userId, status: 'completed' });
    const overdueTasks = await Task.countDocuments({ 
      user: userId, 
      dueDate: { $lt: new Date() },
      status: { $ne: 'completed' }
    });

    const formattedStats = {
      total: totalTasks,
      completed: completedTasks,
      overdue: overdueTasks,
      byStatus: stats.reduce((acc, stat) => {
        acc[stat._id] = stat.count;
        return acc;
      }, {}),
      byPriority: priorityStats.reduce((acc, stat) => {
        acc[stat._id] = stat.count;
        return acc;
      }, {})
    };

    sendSuccessResponse(res, 'Task statistics retrieved successfully', formattedStats);
  } catch (error) {
    console.error('Get task stats error:', error);
    sendErrorResponse(res, 'Failed to retrieve task statistics', 500);
  }
};

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getTaskStats
};