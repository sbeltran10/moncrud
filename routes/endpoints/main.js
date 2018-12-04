const express = require('express')
const router = express.Router()
const connectionManager = require('../services/connection-manager')

router.get('/', (req, res, next) => {
  res.render('main',
    {
      connections: connectionManager.connections,
      hasCollections: connectionManager.connections.length > 0,
      collections: []
    })
})

module.exports = router
