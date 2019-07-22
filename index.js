// Packages
const Router = require('router')
const finalhandler = require('finalhandler')
const jwt = require('express-jwt')

// Utilities
const handlers = require('./lib/handlers')
const handleUnauthorized = require('./lib/handle-unauthorized')

// Initialize a new router
const router = Router()

// JWT
router.use(handleUnauthorized)

// Router
router.get('/user/:user', handlers.getUser)
router.get('/user/:user/img', handlers.getPhoto)
router.get('/user/:user/base64', handlers.getPhoto64)
router.post('/user/:user', jwt({ secret: process.env.SYSTEM_JWT_SECRET }), handlers.uploadPhoto)

module.exports = (request, response) => {
  router(request, response, finalhandler(request, response))
}
