const express = require('express')
const databaseController = require('../controllers/database')
const connectionManager = require('../services/connection-manager')
const authMiddleware = require('./middleware/authentication')
const router = express.Router()

router.get('/:database', (req, res, next) => {
  databaseController.getData(req)
    .then(database => {
      res.render('main/database',
        {
          connections: connectionManager.connections,
          database: database,
          collections: [],
          previousPage: '/main',
          user: req.decoded
        })
    })
    .catch(err => {
      console.log(err)
      res.render('error')
    })
})

router.use(authMiddleware.generateRoleVerification('admin'))
router.delete('/:database', (req, res, next) => {
  databaseController.removeDatabase(req)
  res.redirect(303, `/main`)
})

module.exports = router
