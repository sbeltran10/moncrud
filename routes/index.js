const connectionManager = require('./services/connection-manager')

module.exports = app => {
  connectionManager.loadConnections()

  app.use('/', require('./endpoints'))
  app.use('/setup', require('./endpoints/setup'))
  app.use('/logout', require('./endpoints/logout'))

  const authMiddleware = require('./endpoints/middleware/authentication')
  app.all('/main/*', authMiddleware.verifyToken)
  app.use('/main', require('./endpoints/main'))
  app.use('/main/connections', require('./endpoints/connections'))
  app.use('/main/databases', require('./endpoints/databases'))
  app.use('/main/databases', require('./endpoints/collections'))
  app.use('/main/databases', require('./endpoints/documents'))
}
