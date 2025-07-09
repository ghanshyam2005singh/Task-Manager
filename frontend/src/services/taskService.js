import api from './api';

export const taskService = {
  // Get all tasks with filters and pagination
  getTasks: async (params = {}) => {
    const queryString = new URLSearchParams(
      Object.entries(params).filter(([_, value]) => value !== '' && value != null)
    ).toString();
    
    return await api.get(`/tasks?${queryString}`);
  },

  // Get single task
  getTask: async (id) => {
    return await api.get(`/tasks/${id}`);
  },

  // Create new task
  createTask: async (taskData) => {
    return await api.post('/tasks', taskData);
  },

  // Update task
  updateTask: async (id, taskData) => {
    return await api.put(`/tasks/${id}`, taskData);
  },

  // Delete task
  deleteTask: async (id) => {
    return await api.delete(`/tasks/${id}`);
  },

  // Get task statistics
  getStats: async () => {
    return await api.get('/tasks/stats');
  },
};