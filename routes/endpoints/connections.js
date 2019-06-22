const express = require('express')
const router = express.Router()
const connectionManager = require('../services/connection-manager')
const connectionController = require('../controllers/connection')

const renderPage = (res, properties) => {
  res.render('main/connection',
    {
      ...properties,
      connections: connectionManager.connections,
      previousPage: '/main'
    })
}

router.get('/', (req, res, next) => {
  renderPage(res, { user: req.decoded })
})

router.post('/', (req, res, next) => {
  connectionController.connectNew(req)
    .then(() => {
      renderPage(res, {
        sucMessage: 'Database connection added sucessfully. Select the database on the navigation panel to manage its data',
        user: req.decoded
      })
    })
    .catch(err => {
      let message
      if (err.code === 13) {
        message = 'An error occured when attempting to perform read operations on the database. Please ensure the user has the correct permissions on the database'
      } else {
        message = 'An error occured establishing a connection with the database. Please ensure the connection URI is correct and try again. This error might also occur because of a firewall issue on your mongodb\'s server'
      }
      renderPage(res, {
        errMessage: message,
        user: req.decoded
      })
    })
})

module.exports = router
