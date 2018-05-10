const mongojs = require('mongojs')
const sanitize = require('mongo-sanitize')
const md = require('markdown-it')()
const { json, send } = require('micro')
const { readFileSync } = require('fs')
const { resolve } = require('path')
const config = require('../config')
const db = mongojs(config.server)
const collection = db.collection(config.collection)
const placeholder = readFileSync(resolve('data/placeholder.png'), 'base64')
const logger = require('./logger')

module.exports.getUser = async (request, response) => {
  const user = sanitize(request.params.user)
  logger('info', ['handlers', 'getUser', 'user', user, 'start'])
  collection.findOne({ username: user }, (error, document) => {
    if (error) {
      logger('error', ['handlers', 'getUser', 'user', user, error])
      send(response, 500, error)
    } else {
      logger('info', ['handlers', 'getUser', 'user', user, 'success'])
      send(response, 200, document)
    }
  })
}

module.exports.getPhoto = async (request, response) => {
  const user = sanitize(request.params.user)
  logger('info', ['handlers', 'getPhoto', 'user', user, 'start'])
  collection.findOne({ username: user }, (error, document) => {
    if (error) {
      logger('error', ['handlers', 'getPhoto', 'user', user, error])
      send(response, 500, error)
    } else {
      logger('info', ['handlers', 'getPhoto', 'user', user, 'success'])
      const data = document && document.file
        ? `<div><img src="data:image/png;base64, ${document.file}"/></div>`
        : `<div><img src="data:image/png;base64, ${placeholder}"/></div>`
      send(response, 200, data)
    }
  })
}

module.exports.getPhoto64 = (request, response) => {
  const user = sanitize(request.params.user)
  logger('info', ['handlers', 'getPhoto64', 'user', user, 'start'])
  collection.findOne({ username: user }, (error, document) => {
    if (error) {
      logger('error', ['handlers', 'getPhoto64', 'user', user, error])
      send(response, 500, error)
    } else {
      logger('info', ['handlers', 'getPhoto64', 'user', user, 'success'])
      const data = document && document.file
        ? document.file
        : placeholder
      send(response, 200, data)
    }
  })
}

module.exports.uploadPhoto = async (request, response) => {
  const user = sanitize(request.params.user)
  const { file, url } = await json(request)
  let updates = {}
  if (file) {
    updates.file = sanitize(file)
  }
  if (url) {
    updates.url = sanitize(url)
  }
  collection.update({ username: user }, { '$set': updates }, { upsert: true }, (error, document) => {
    if (error) {
      logger('error', ['handlers', 'uploadPhoto', 'user', user, error])
      send(response, 500, error)
    } else {
      logger('info', ['handlers', 'uploadPhoto', 'user', user, 'success'])
      return { success: 1 }
    }
  })
}

module.exports.getReadme = (request, response) => {
  logger('info', ['handlers', 'frontpage'])
  const readme = readFileSync('./README.md', 'utf-8')
  send(response, 200, md.render(readme))
}
