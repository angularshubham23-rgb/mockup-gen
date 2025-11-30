const AppError = require('../errors/AppError')

function errorHandler(err, req, res, next) {
  // Default shapes
  if (!err) return next()

  // If it's a structured AppError, use its values
  if (err instanceof AppError) {
    return res.status(err.status).json({ error: err.code, message: err.message, details: err.details })
  }

  // For unhandled errors, mask internal details and send a generic response
  console.error('Unhandled Error:', err && (err.stack || err.message || err))
  return res.status(500).json({ error: 'internal_error', message: 'An internal error occurred' })
}

module.exports = errorHandler
