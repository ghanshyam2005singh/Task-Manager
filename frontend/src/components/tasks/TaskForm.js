import React, { useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useForm, Controller } from 'react-hook-form';
import { useTasks } from '../../context/TaskContext';

const TaskForm = ({ open, task, onClose, onSubmit }) => {
  const { createTask, updateTask, loading } = useTasks();
  const isEditing = Boolean(task);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      status: 'pending',
      priority: 'medium',
      dueDate: null,
    },
  });

  useEffect(() => {
    if (open) {
      if (isEditing && task) {
        reset({
          title: task.title || '',
          description: task.description || '',
          status: task.status || 'pending',
          priority: task.priority || 'medium',
          dueDate: task.dueDate ? new Date(task.dueDate) : null,
        });
      } else {
        reset({
          title: '',
          description: '',
          status: 'pending',
          priority: 'medium',
          dueDate: null,
        });
      }
    }
  }, [open, isEditing, task, reset]);

  const onFormSubmit = async (data) => {
    try {
      const taskData = {
        ...data,
        dueDate: data.dueDate ? data.dueDate.toISOString() : null,
      };

      let result;
      if (isEditing) {
        result = await updateTask(task._id, taskData);
      } else {
        result = await createTask(taskData);
      }

      if (result.success) {
        onSubmit();
      }
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {isEditing ? 'Edit Task' : 'Create New Task'}
      </DialogTitle>

      <DialogContent>
        <Box component="form" sx={{ mt: 1 }}>
          <TextField
            autoFocus
            margin="normal"
            fullWidth
            label="Task Title"
            variant="outlined"
            error={!!errors.title}
            helperText={errors.title?.message}
            {...register('title', {
              required: 'Task title is required',
              maxLength: {
                value: 100,
                message: 'Title must be less than 100 characters',
              },
            })}
          />

          <TextField
            margin="normal"
            fullWidth
            label="Description"
            variant="outlined"
            multiline
            rows={3}
            error={!!errors.description}
            helperText={errors.description?.message}
            {...register('description', {
              maxLength: {
                value: 500,
                message: 'Description must be less than 500 characters',
              },
            })}
          />

          <Box display="flex" gap={2} mt={2}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select {...field} label="Status">
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="in-progress">In Progress</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                  </Select>
                )}
              />
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Controller
                name="priority"
                control={control}
                render={({ field }) => (
                  <Select {...field} label="Priority">
                    <MenuItem value="low">Low</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="high">High</MenuItem>
                  </Select>
                )}
              />
            </FormControl>
          </Box>

          <Box mt={2}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Controller
                name="dueDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    label="Due Date"
                    value={field.value}
                    onChange={field.onChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        error={!!errors.dueDate}
                        helperText={errors.dueDate?.message}
                      />
                    )}
                    minDate={new Date()}
                  />
                )}
              />
            </LocalizationProvider>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit(onFormSubmit)}
          variant="contained"
          disabled={loading}
        >
          {loading
            ? isEditing
              ? 'Updating...'
              : 'Creating...'
            : isEditing
            ? 'Update Task'
            : 'Create Task'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskForm;