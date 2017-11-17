module.exports = {
  server: process.env.DB_SERVER, // with mongodb://, username, password, port, database
  collection: process.env.DB_COLLECTION,
  jwt_secret: process.env.JWT_SECRET || 'abc123'
}
