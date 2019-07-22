const mongojs = require('mongojs')
const sanitize = require('mongo-sanitize')
const { readFileSync } = require('fs')
const { resolve } = require('path')
const db = mongojs(process.env.DB_SERVER)
const collection = db.collection(process.env.DB_COLLECTION)
const placeholder = readFileSync(resolve(`${__dirname}/../data/placeholder.png`), 'base64')
const logger = require('./logger')

module.exports.getUser = async (request, response) => {
  const user = sanitize(request.params.user)
  logger('info', ['handlers', 'getUser', 'user', user, 'start'])
  collection.findOne({ username: user }, (error, document) => {
    if (error) {
      logger('error', ['handlers', 'getUser', 'user', user, error])
      response.status(500)
      response.send(error)
    } else {
      logger('info', ['handlers', 'getUser', 'user', user, 'success'])
      response.json(document)
    }
  })
}

module.exports.getPhoto = async (request, response) => {
  const user = sanitize(request.params.user)
  logger('info', ['handlers', 'getPhoto', 'user', user, 'start'])
  collection.findOne({ username: user }, (error, document) => {
    if (error) {
      logger('error', ['handlers', 'getPhoto', 'user', user, error])
      response.status(500)
      response.send(error)
    } else {
      logger('info', ['handlers', 'getPhoto', 'user', user, 'success'])
      const data = document && document.file
        ? `<div><img src="data:image/png;base64, ${document.file}"/></div>`
        : `<div><img src="data:image/png;base64, ${placeholder}"/></div>`
      response.send(data)
    }
  })
}

module.exports.getPhoto64 = (request, response) => {
  const user = sanitize(request.params.user)
  logger('info', ['handlers', 'getPhoto64', 'user', user, 'start'])
  collection.findOne({ username: user }, (error, document) => {
    if (error) {
      logger('error', ['handlers', 'getPhoto64', 'user', user, error])
      response.status(500)
      response.send(error)
    } else {
      logger('info', ['handlers', 'getPhoto64', 'user', user, 'success'])
      const data = document && document.file
        ? document.file
        : placeholder
      response.send(data)
    }
  })
}

module.exports.uploadPhoto = async (request, response) => {
  const user = sanitize(request.params.user)
  const { file, url } = request.body
  const updates = {}
  if (file) {
    updates.file = sanitize(file)
  }
  if (url) {
    updates.url = sanitize(url)
  }
  collection.update({ username: user }, { $set: updates }, { upsert: true }, (error, document) => {
    if (error) {
      logger('error', ['handlers', 'uploadPhoto', 'user', user, error])
      response.status(500)
      response.send(error)
    } else {
      logger('info', ['handlers', 'uploadPhoto', 'user', user, 'success'])
      response.json({ success: 1 })
    }
  })
}
