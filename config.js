module.exports = {
  server: process.env.DB_SERVER || 'mongodb://localhost/logs', // with mongodb://, username, password, port, database
  collection: process.env.DB_COLLECTION || 'images',
  SYSTEM_JWT_SECRET: process.env.SYSTEM_JWT_SECRET || 'abc123',
  PAPERTRAIL_HOSTNAME: process.env.PAPERTRAIL_HOSTNAME || 'userphotos',
  PAPERTRAIL_HOST: process.env.PAPERTRAIL_HOST || 'logs.papertrailapp.com',
  PAPERTRAIL_PORT: process.env.PAPERTRAIL_PORT || 12345
}
