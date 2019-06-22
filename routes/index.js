const connectionManager = require('./services/connection-manager')

module.exports = app => {
  connectionManager.loadConnections()
  app.use('/', require('./endpoints'))
  app.use('/setup', require('./endpoints/setup'))
  app.use('/logout', require('./endpoints/logout'))

  const authMiddleware = require('./endpoints/middleware/authentication')
  app.all('/main', authMiddleware.verifyToken)
  app.use('/main', require('./endpoints/main'))
  app.all('/main/*', authMiddleware.verifyToken)
  app.all('/main/connections', authMiddleware.generateRoleVerification('admin'))
  app.use('/main/connections', require('./endpoints/connections'))
  app.all('/main/users', authMiddleware.generateRoleVerification('admin'))
  app.use('/main/users', require('./endpoints/users'))
  app.use('/main/databases', require('./endpoints/databases'))
  app.use('/main/databases', require('./endpoints/collections'))
  app.use('/main/databases', require('./endpoints/documents'))
}
