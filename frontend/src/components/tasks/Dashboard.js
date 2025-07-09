import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Fab,
  Chip,
} from '@mui/material';
import {
  Add as AddIcon,
  Assignment,
  CheckCircle,
  Schedule,
  Warning,
} from '@mui/icons-material';
import { useTasks } from '../../context/TaskContext';
import { useAuth } from '../../context/AuthContext';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import TaskFilters from './TaskFilters';
import Loader from '../common/Loader';

const Dashboard = () => {
  const { user } = useAuth();
  const {
    tasks,
    loading,
    stats,
    filters,
    pagination,
    fetchTasks,
    fetchStats,
    setFilters,
  } = useTasks();
  
  const [openTaskForm, setOpenTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
    fetchStats();
  }, [fetchTasks, fetchStats]);

  const handleCreateTask = () => {
    setEditingTask(null);
    setOpenTaskForm(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setOpenTaskForm(true);
  };

  const handleCloseTaskForm = () => {
    setOpenTaskForm(false);
    setEditingTask(null);
  };

  const handleTaskFormSubmit = () => {
    handleCloseTaskForm();
    fetchTasks();
    fetchStats();
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    fetchTasks(1, newFilters);
  };

  const handlePageChange = (page) => {
    fetchTasks(page);
  };

  const StatCard = ({ title, value, icon, color = 'primary' }) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography color="textSecondary" gutterBottom variant="body2">
              {title}
            </Typography>
            <Typography variant="h4" component="div">
              {value}
            </Typography>
          </Box>
          <Box color={`${color}.main`}>
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  if (loading && tasks.length === 0) {
    return <Loader message="Loading dashboard..." />;
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      {/* Welcome Section */}
      <Box mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome back, {user?.name}!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here's an overview of your tasks
        </Typography>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Tasks"
            value={stats.total}
            icon={<Assignment fontSize="large" />}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Completed"
            value={stats.completed}
            icon={<CheckCircle fontSize="large" />}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="In Progress"
            value={stats.byStatus?.['in-progress'] || 0}
            icon={<Schedule fontSize="large" />}
            color="info"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Overdue"
            value={stats.overdue}
            icon={<Warning fontSize="large" />}
            color="error"
          />
        </Grid>
      </Grid>

      {/* Priority Breakdown */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Tasks by Priority
        </Typography>
        <Box display="flex" gap={1} flexWrap="wrap">
          <Chip
            label={`High: ${stats.byPriority?.high || 0}`}
            color="error"
            variant="outlined"
          />
          <Chip
            label={`Medium: ${stats.byPriority?.medium || 0}`}
            color="warning"
            variant="outlined"
          />
          <Chip
            label={`Low: ${stats.byPriority?.low || 0}`}
            color="success"
            variant="outlined"
          />
        </Box>
      </Paper>

      {/* Task Filters */}
      <TaskFilters
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      {/* Task List */}
      <TaskList
        tasks={tasks}
        loading={loading}
        pagination={pagination}
        onEditTask={handleEditTask}
        onPageChange={handlePageChange}
        onRefresh={() => {
          fetchTasks();
          fetchStats();
        }}
      />

      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="add task"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
        }}
        onClick={handleCreateTask}
      >
        <AddIcon />
      </Fab>

      {/* Task Form Dialog */}
      <TaskForm
        open={openTaskForm}
        task={editingTask}
        onClose={handleCloseTaskForm}
        onSubmit={handleTaskFormSubmit}
      />
    </Container>
  );
};

export default Dashboard;