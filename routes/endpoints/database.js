const express = require('express')
const databaseController = require('../controllers/database')
const connectionManager = require('../services/connection-manager')
const router = express.Router()

router.get('/:database', (req, res, next) => {
  databaseController.getData(req)
    .then(database => {
      res.render('main/database',
        {
          connections: connectionManager.connections,
          database: database,
          collections: [],
          previousPage: './'
        })
    })
    .catch(err => {
      console.log(err)
      res.render('error')
    })
})

module.exports = router
