const connectionManager = require('./services/connection-manager')

module.exports = app => {
  connectionManager.loadConnections()

  app.use('/', require('./endpoints'))
  app.use('/setup', require('./endpoints/setup'))
  app.use('/logout', require('./endpoints/logout'))

  const authMiddleware = require('./endpoints/middleware/authentication')
  app.all('/main/*', authMiddleware.verifyToken)
  app.use('/main', require('./endpoints/main'))
  app.use('/main/connection', require('./endpoints/connection'))
  app.use('/main', require('./endpoints/database'))
  app.use('/main', require('./endpoints/collection'))
  app.use('/main', require('./endpoints/document'))
}
