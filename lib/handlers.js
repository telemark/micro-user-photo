const mongojs = require('mongojs')
const sanitize = require('mongo-sanitize')
const md = require('markdown-it')()
const jwtAuth = require('micro-jwt-auth')
const { json } = require('micro')
const { readFileSync } = require('fs')
const { resolve } = require('path')
const config = require('../config')
const db = mongojs(config.server)
const collection = db.collection(config.collection)
const placeholder = readFileSync(resolve('data/placeholder.png'), 'base64')

module.exports.getPhoto = (req, res) => {
  return new Promise((resolve, reject) => {
    const user = sanitize(req.params.user)
    collection.findOne({ username: user }, (error, document) => {
      if (error) {
        return reject(error)
      } else {
        return resolve(document && document.file
          ? `<div><img src="data:image/png;base64, ${document.file}"/></div>`
          : `<div><img src="data:image/png;base64, ${placeholder}"/></div>`)
      }
    })
  })
}

module.exports.getPhoto64 = (req, res) => {
  return new Promise((resolve, reject) => {
    const user = sanitize(req.params.user)
    collection.findOne({ username: user }, (error, document) => {
      if (error) {
        return reject(error)
      } else {
        return resolve(document && document.file
          ? document.file
          : placeholder)
      }
    })
  })
}

module.exports.uploadPhoto = jwtAuth(config.jwt_secret, (req, res) => {
  return new Promise(async (resolve, reject) => {
    const user = sanitize(req.params.user)
    const { file } = await json(req)
    collection.update({ username: user }, { '$set': { file: sanitize(file) } }, { upsert: true }, (error, document) => {
      if (error) {
        return reject(error.message)
      } else {
        return { success: 1 }
      }
    })
  })
})

module.exports.getReadme = async (req, res) => {
  const readme = readFileSync('./README.md', 'utf-8')
  return md.render(readme)
}
