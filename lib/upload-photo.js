const MongoClient = require('mongodb').MongoClient
const sanitize = require('mongo-sanitize')
const jwtAuth = require('micro-jwt-auth')
const config = require('../config')

module.exports = jwtAuth(config.jwt_secret)(async (req, res) => {
  const user = sanitize(req.params.user)
  const file = sanitize(req.params.file)
  try {
    const db = await MongoClient.connect(config.server)
    const collection = db.collection(config.collection)
    const document = await collection.findOne({ username: user })
    if (document) await collection.deleteOne({ username: user })
    collection.insert({ username: user, file: file })
    db.close()
    return { success: 1 }
  } catch (e) {
    throw e.message
  }
})
