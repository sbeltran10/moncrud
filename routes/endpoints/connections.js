const express = require('express')
const router = express.Router()
const connectionManager = require('../services/connection-manager')
const connectionController = require('../controllers/connection')

router.get('/', (req, res, next) => {
  res.render('main/connection',
    {
      connections: connectionManager.connections,
      previousPage: '/main'
    })
})

router.post('/', (req, res, next) => {
  connectionController.connectNew(req)
    .then(() => {
      res.render('main/connection',
        {
          connections: connectionManager.connections,
          previousPage: '/main',
          sucMessage: 'Database connection added sucessfully. Select the database on the navigation panel to manage its data'
        })
    })
    .catch(err => {
      let message
      if (err.code === 13) {
        message = 'An error occured when attempting to perform read operations on the database. Please ensure the user has the correct permissions on the database'
      } else {
        message = 'An error occured establishing a connection with the database. Please ensure the connection URI is correct and try again. This error might also occur because of a firewall issue on your mongodb\'s server'
      }
      res.render('main/connection',
        {
          connections: connectionManager.connections,
          previousPage: '/main',
          errMessage: message
        })
    })
})

module.exports = router
