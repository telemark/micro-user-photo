const { router, get } = require('microrouter')
const getReadme = require('./lib/get-readme')
const getPhoto = require('./lib/get-photo')

module.exports = router(
  get('/', getReadme),
  get('/user/:user', getPhoto)
)
