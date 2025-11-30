class AppError extends Error {
  constructor(message, { status = 500, code = 'internal_error', details = null } = {}) {
    super(message)
    this.name = 'AppError'
    this.status = status
    this.code = code
    this.details = details
    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = AppError
