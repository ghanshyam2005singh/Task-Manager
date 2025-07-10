// filepath: c:\Users\Pramod\Desktop\to-do\frontend\src\context\TaskContext.js
import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { taskService } from '../services/taskService';
import toast from 'react-hot-toast';

const TaskContext = createContext();

const initialState = {
  tasks: [],
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalTasks: 0,
    hasNext: false,
    hasPrev: false,
  },
  filters: {
    status: '',
    priority: '',
    search: '',
    sortBy: 'createdAt',
    sortOrder: 'desc',
  },
  stats: {
    total: 0,
    completed: 0,
    overdue: 0,
    byStatus: {},
    byPriority: {},
  },
};

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'SET_TASKS':
  return {
    ...state,
    tasks: Array.isArray(action.payload.tasks) ? action.payload.tasks : [],
    pagination: action.payload.pagination,
    loading: false,
    error: null,
  };
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [action.payload, ...state.tasks],
      };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task._id === action.payload._id ? action.payload : task
        ),
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task._id !== action.payload),
      };
    case 'SET_FILTERS':
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
      };
    case 'SET_STATS':
      return {
        ...state,
        stats: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  const fetchTasks = useCallback(async (page = 1, filters = {}) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const queryParams = {
        page,
        limit: 10,
        ...state.filters,
        ...filters,
      };

      const response = await taskService.getTasks(queryParams);
      
      dispatch({
        type: 'SET_TASKS',
        payload: {
          tasks: response.data,
          pagination: response.pagination,
        },
      });
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch tasks';
      dispatch({ type: 'SET_ERROR', payload: message });
      toast.error(message);
    }
  }, [state.filters]);

  const createTask = async (taskData) => {
    try {
      const response = await taskService.createTask(taskData);
      dispatch({ type: 'ADD_TASK', payload: response.data });
      toast.success('Task created successfully');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to create task';
      toast.error(message);
      return { success: false, message };
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      const response = await taskService.updateTask(id, taskData);
      dispatch({ type: 'UPDATE_TASK', payload: response.data });
      toast.success('Task updated successfully');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update task';
      toast.error(message);
      return { success: false, message };
    }
  };

  const deleteTask = async (id) => {
    try {
      await taskService.deleteTask(id);
      dispatch({ type: 'DELETE_TASK', payload: id });
      toast.success('Task deleted successfully');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to delete task';
      toast.error(message);
      return { success: false, message };
    }
  };

  const fetchStats = async () => {
    try {
      const response = await taskService.getStats();
      dispatch({ type: 'SET_STATS', payload: response.data });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const setFilters = (filters) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  };

  const clearFilters = () => {
    dispatch({
      type: 'SET_FILTERS',
      payload: {
        status: '',
        priority: '',
        search: '',
        sortBy: 'createdAt',
        sortOrder: 'desc',
      },
    });
  };

  const value = {
    ...state,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    fetchStats,
    setFilters,
    clearFilters,
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};

export default TaskContext;