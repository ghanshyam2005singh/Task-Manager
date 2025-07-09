export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    PROFILE: '/auth/profile',
    LOGOUT: '/auth/logout',
    CHANGE_PASSWORD: '/auth/change-password',
  },
  TASKS: {
    BASE: '/tasks',
    STATS: '/tasks/stats',
  },
};

export const TASK_STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in-progress',
  COMPLETED: 'completed',
};

export const TASK_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
};

export const SORT_OPTIONS = {
  CREATED_AT: 'createdAt',
  DUE_DATE: 'dueDate',
  TITLE: 'title',
  PRIORITY: 'priority',
  STATUS: 'status',
};

export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};

export const APP_CONFIG = {
  APP_NAME: 'Task Manager',
  API_TIMEOUT: 10000,
  PAGE_SIZE: 10,
};