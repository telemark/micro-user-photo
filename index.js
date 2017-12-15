// Packages
const Router = require('router')
const finalhandler = require('finalhandler')
const cors = require('cors')
const jwt = require('express-jwt')

// Utilities
const handlers = require('./lib/handlers')
const config = require('./config')
const handleUnauthorized = require('./lib/handle-unauthorized')

// Initialize a new router
const router = Router()

// CORS
router.use(cors())

// JWT
router.use(handleUnauthorized)

// Router
router.get('/', handlers.getReadme)
router.get('/user/:user', handlers.getUser)
router.get('/user/:user/img', handlers.getPhoto)
router.get('/user/:user/base64', handlers.getPhoto64)
router.post('/user/:user', jwt({secret: config.JWT_SECRET}), handlers.uploadPhoto)

module.exports = (request, response) => {
  router(request, response, finalhandler(request, response))
}
