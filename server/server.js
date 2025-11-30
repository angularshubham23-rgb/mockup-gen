const express = require('express');
const cors = require('cors');
const path = require('path');

const mockupRoutes = require('./routes/mockupRoutes');

const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));

// quick request logger for /api calls (debug)
app.use('/api', (req, res, next) => {
  console.log('[api] %s %s body:%s', req.method, req.path, JSON.stringify(req.body || {}).slice(0, 300))
  next()
})

// API
app.use('/api/mockup', mockupRoutes);

// Simple health
app.get('/api/health', (req, res) => res.json({ ok: true, time: Date.now() }));

// Centralized error handler (must be registered after routes)
const errorHandler = require('./middleware/errorHandler')


// Serve static client (if built)
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
});

// register error handler last
app.use(errorHandler)

// graceful crash / logging for unhandled promise rejections
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection at:', reason)
})
process.on('uncaughtException', (err) => {
  console.error('Uncaught exception', err)
})

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Mockup generator server listening on ${PORT}`));

module.exports = app;
