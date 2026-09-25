const express = require('express');
const path = require('path');
const taskRoutes = require('./routes/taskRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(express.json());

// Serve the frontend (static files)
app.use(express.static(path.join(__dirname, '../../frontend')));

// Health check (useful for Docker/Kubernetes probes)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// API routes
app.use('/api/tasks', taskRoutes);

// Fallback to frontend for any non-API route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/index.html'));
});

app.use(errorHandler);

module.exports = app;
