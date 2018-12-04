const express = require('express')
const collectionController = require('../controllers/collection')
const connectionManager = require('../services/connection-manager')
const router = express.Router()

const handleRequest = (req, res, next) => {
  collectionController.getData(req)
    .then(collection => {
      res.render('main/collection',
        {
          connections: connectionManager.connections,
          collection: collection,
          inputValues: { page: req.params.page ? req.params.page : '0', ...req.query },
          databaseName: req.params.database
        })
    })
    .catch(err => {
      console.log(err)
      res.render('error')
    })
}

router.get('/:database/:collection', handleRequest)
router.get('/:database/:collection/page/:page', handleRequest)
router.get('/:database/:collection/reset/1', (req, res) => {
  res.redirect(`/main/${req.params.database}/${req.params.collection}`)
})

module.exports = router
