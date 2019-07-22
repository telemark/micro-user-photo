const logger = require('./logger')

module.exports = (error, request, response, next) => {
  if (error.name === 'UnauthorizedError') {
    logger('error', ['handle-unauthorized', error])
    response.status(401)
    response.json({ error: 'invalid token' })
  }
}
