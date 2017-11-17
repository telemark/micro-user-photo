const { router, get, post } = require('microrouter')
const getReadme = require('./lib/get-readme')
const getPhoto = require('./lib/get-photo')
const getPhoto64 = require('./lib/get-photo64')
const uploadPhoto = require('./lib/upload-photo')
const cors = require('micro-cors')()

module.exports = router(
  get('/', getReadme),
  get('/user/:user', cors(getPhoto)),
  get('/user/:user/base64', cors(getPhoto64)),
  post('/user/:user', cors(uploadPhoto))
)
