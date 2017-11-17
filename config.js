module.exports = {
  server: process.env.DB_SERVER || 'mongodb://localhost/logs', // with mongodb://, username, password, port, database
  collection: process.env.DB_COLLECTION || 'images',
  jwt_secret: process.env.JWT_SECRET || 'abc123'
}
