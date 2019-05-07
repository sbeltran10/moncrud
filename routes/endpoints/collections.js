const express = require('express')
const collectionController = require('../controllers/collection')
const connectionManager = require('../services/connection-manager')
const router = express.Router()

const handleGetRequest = (req, res, next) => {
  let createdId = ''
  if (req.query.createdId) {
    createdId = req.query.createdId
  }

  collectionController.performOperation(req)
    .then(collection => {
      res.render('main/collection',
        {
          connections: connectionManager.connections,
          collection,
          inputValues: { page: req.params.page ? req.params.page : '0', ...req.query },
          databaseName: req.params.database,
          collectionQuery: req.query,
          createdId
        })
    })
    .catch(err => {
      console.log(err)
      res.render('error')
    })
}

router.get('/:database/collections/:collection', handleGetRequest)
router.get('/:database/collections/:collection/page/:page', handleGetRequest)
router.get('/:database/collections/:collection/reset/1', (req, res) => {
  res.redirect(`/main/databases/${req.params.database}/collections/${req.params.collection}`)
})

router.get('/:database/collections/:collection/create', (req, res, next) => {
  collectionController.performOperation(req, 'create-form')
    .then((collection) => {
      res.render('main/document-create', {
        previousPage: '../' + req.params.collection,
        connections: connectionManager.connections,
        collection,
        databaseName: req.params.database
      })
    })
    .catch(err => {
      console.log(err)
      res.render('error')
    })
})

router.post('/:database/collections/:collection/create', (req, res, next) => {
  collectionController.performOperation(req, 'create')
    .then((createdId) => {
      res.redirect(`/main/databases/${req.params.database}/collections/${req.params.collection}?createdId=${createdId}`)
    })
    .catch(err => {
      console.log(err)
      res.render('error')
    })
})

module.exports = router
