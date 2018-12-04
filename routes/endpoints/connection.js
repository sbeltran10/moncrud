const express = require('express')
const router = express.Router()
const connectionManager = require('../services/connection-manager')
const connectionController = require('../controllers/connection')

router.get('/', (req, res, next) => {
  res.render('main/connection', { connections: connectionManager.connections })
})

router.post('/', (req, res, next) => {
  connectionController.connectNew(req)
})

module.exports = router
