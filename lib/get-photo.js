const readFileSync = require('fs').readFileSync
const config = require('../config')
const resolve = require('path').resolve
const placeholder = readFileSync(resolve('data/placeholder.jpg'), 'base64')
const MongoClient = require('mongodb').MongoClient

module.exports = async (req, res) => {
  const user = req.params.user
  try {
    const db = await MongoClient.connect(config.server)
    const collection = db.collection(config.collection)
    const document = await collection.findOne({ username: user })
    db.close()
    return document && document.file
      ? `<div><img src="data:image/png;base64, ${document.file}"/></div>`
      : `<div><img src="data:image/jpeg;base64, ${placeholder}"/></div>`
  } catch (e) {
    throw e.message
  }
}
