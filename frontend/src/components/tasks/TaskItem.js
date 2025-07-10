import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import {
  Box,
  Typography,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';
import {
  MoreVert,
  Edit,
  Delete,
  CheckCircle,
  RadioButtonUnchecked,
  Schedule,
  Flag,
} from '@mui/icons-material';
import { format, isAfter, parseISO } from 'date-fns';
import { useTasks } from '../../context/TaskContext';

const TaskItem = ({ task, onEdit, onRefresh }) => {
  const { updateTask, deleteTask } = useTasks();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleMenuClose();
    onEdit(task);
  };

const handleDelete = () => {
    handleMenuClose();
    toast((t) => (
      <Box>
        <Typography>Are you sure you want to delete this task?</Typography>
        <Box mt={1} display="flex" gap={1}>
          <button
            style={{ color: 'white', background: '#d32f2f', border: 'none', padding: '4px 12px', borderRadius: 4, cursor: 'pointer' }}
            onClick={async () => {
              await deleteTask(task._id);
              onRefresh();
              toast.dismiss(t.id);
            }}
          >
            Delete
          </button>
          <button
            style={{ marginLeft: 8, color: '#333', background: '#eee', border: 'none', padding: '4px 12px', borderRadius: 4, cursor: 'pointer' }}
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
        </Box>
      </Box>
    ), { duration: 6000 });
  };

  const handleToggleStatus = async () => {
    setIsUpdating(true);
    const newStatus = task.status === 'completed' ? 'pending' : 'completed';
    await updateTask(task._id, { status: newStatus });
    setIsUpdating(false);
    onRefresh();
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'in-progress':
        return 'info';
      case 'pending':
        return 'default';
      default:
        return 'default';
    }
  };

  const isOverdue = task.dueDate && 
    isAfter(new Date(), parseISO(task.dueDate)) && 
    task.status !== 'completed';

      useEffect(() => {
    if (isOverdue) {
      toast.error(`Task "${task.title}" is overdue!`);
    }
    // Only show once per mount
    // eslint-disable-next-line
  }, [isOverdue, task.title]);

  return (
    <Box sx={{ p: 2 }}>
      
      <Box display="flex" alignItems="flex-start" gap={2}>
        {/* Status Toggle */}
        <Tooltip title={task.status === 'completed' ? 'Mark as pending' : 'Mark as completed'}>
          <IconButton
            onClick={handleToggleStatus}
            disabled={isUpdating}
            color={task.status === 'completed' ? 'success' : 'default'}
          >
            {task.status === 'completed' ? <CheckCircle /> : <RadioButtonUnchecked />}
          </IconButton>
        </Tooltip>

        {/* Task Content */}
        <Box flex={1}>
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <Typography
              variant="h6"
              sx={{
                textDecoration: task.status === 'completed' ? 'line-through' : 'none',
                opacity: task.status === 'completed' ? 0.7 : 1,
              }}
            >
              {task.title}
            </Typography>
            
            <Chip
              size="small"
              label={task.priority}
              color={getPriorityColor(task.priority)}
              icon={<Flag />}
            />
            
            <Chip
              size="small"
              label={task.status.replace('-', ' ')}
              color={getStatusColor(task.status)}
            />
          </Box>

          {task.description && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 1,
                textDecoration: task.status === 'completed' ? 'line-through' : 'none',
                opacity: task.status === 'completed' ? 0.7 : 1,
              }}
            >
              {task.description}
            </Typography>
          )}

          <Box display="flex" alignItems="center" gap={2}>
            {task.dueDate && (
              <Box display="flex" alignItems="center" gap={0.5}>
                <Schedule fontSize="small" color={isOverdue ? 'error' : 'action'} />
                <Typography
                  variant="caption"
                  color={isOverdue ? 'error' : 'text.secondary'}
                >
                  Due: {format(parseISO(task.dueDate), 'MMM dd, yyyy')}
                </Typography>
              </Box>
            )}
            
            <Typography variant="caption" color="text.secondary">
              Created: {format(parseISO(task.createdAt), 'MMM dd, yyyy')}
            </Typography>
          </Box>
        </Box>

        {/* Actions Menu */}
        <IconButton onClick={handleMenuOpen}>
          <MoreVert />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleEdit}>
            <Edit fontSize="small" sx={{ mr: 1 }} />
            Edit
          </MenuItem>
          <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
            <Delete fontSize="small" sx={{ mr: 1 }} />
            Delete
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default TaskItem;