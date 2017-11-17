const { json } = require('micro')
const MongoClient = require('mongodb').MongoClient
const sanitize = require('mongo-sanitize')
const jwtAuth = require('micro-jwt-auth')
const config = require('../config')

module.exports = jwtAuth(config.jwt_secret)(async (req, res) => {
  const user = sanitize(req.params.user)
  const { file } = await json(req)
  try {
    const db = await MongoClient.connect(config.server)
    const collection = db.collection(config.collection)
    await collection.updateOne({ username: user }, { $set: { file: sanitize(file) } }, { upsert: true })
    db.close()
    return { success: 1 }
  } catch (e) {
    throw e.message
  }
})
