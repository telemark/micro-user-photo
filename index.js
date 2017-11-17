const { router, get, post } = require('microrouter')
const handlers = require('./lib/handlers')
const cors = require('micro-cors')()

module.exports = router(
  get('/', handlers.getReadme),
  get('/user/:user', cors(handlers.getPhoto)),
  get('/user/:user/base64', cors(handlers.getPhoto64)),
  post('/user/:user', cors(handlers.uploadPhoto))
)
