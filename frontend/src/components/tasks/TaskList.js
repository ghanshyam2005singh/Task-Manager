import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Button,
  Pagination,
  Divider,
} from '@mui/material';
import { Refresh } from '@mui/icons-material';
import TaskItem from './TaskItem';
import Loader from '../common/Loader';

const TaskList = ({
  tasks,
  loading,
  pagination,
  onEditTask,
  onPageChange,
  onRefresh,
}) => {
  if (loading) {
    return (
      <Paper sx={{ p: 3 }}>
        <Loader message="Loading tasks..." />
      </Paper>
    );
  }

  if (tasks.length === 0) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No tasks found
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Create your first task to get started!
        </Typography>
        <Button
          variant="outlined"
          startIcon={<Refresh />}
          onClick={onRefresh}
        >
          Refresh
        </Button>
      </Paper>
    );
  }

  return (
    <Paper sx={{ overflow: 'hidden' }}>
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={2}
        bgcolor="grey.50"
      >
        <Typography variant="h6">
          Tasks ({pagination.totalTasks})
        </Typography>
        <Button
          size="small"
          startIcon={<Refresh />}
          onClick={onRefresh}
          disabled={loading}
        >
          Refresh
        </Button>
      </Box>

      <Divider />

      {/* Task Items */}
      <Box>
        {tasks.map((task, index) => (
          <React.Fragment key={task._id}>
            <TaskItem
              task={task}
              onEdit={onEditTask}
              onRefresh={onRefresh}
            />
            {index < tasks.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </Box>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <>
          <Divider />
          <Box display="flex" justifyContent="center" p={2}>
            <Pagination
              count={pagination.totalPages}
              page={pagination.currentPage}
              onChange={(event, page) => onPageChange(page)}
              color="primary"
              showFirstButton
              showLastButton
            />
          </Box>
        </>
      )}
    </Paper>
  );
};

export default TaskList;