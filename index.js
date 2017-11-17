const { router, get } = require('microrouter')
const getReadme = require('./lib/get-readme')
const getPhoto = require('./lib/get-photo')
const getPhoto64 = require('./lib/get-photo64')

module.exports = router(
  get('/', getReadme),
  get('/user/:user', getPhoto),
  get('/user/:user/base64', getPhoto64)
)
