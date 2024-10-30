const { ERROR } = require('./response')

class CustomError extends Error {
  constructor(message, statusCode = 500) {
    super(message)
    this.message = message
    this.statusCode = statusCode
    this.name = 'CustomError'
  }
}

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || 'an unexpected error occured'

  return ERROR(res, statusCode, message)
}

module.exports = { CustomError, errorHandler }
