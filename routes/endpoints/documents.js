const express = require('express')
const documentController = require('../controllers/document')
const connectionManager = require('../services/connection-manager')
const router = express.Router()

router.get('/:database/collections/:collection/documents/:documentId', (req, res, next) => {
  documentController.performOperation(req)
    .then(document => {
      res.render('main/document',
        {
          connections: connectionManager.connections,
          document: document,
          user: req.decoded
        })
    })
    .catch(err => {
      console.log(err)
      res.render('error')
    })
})

router.post('/:database/collections/:collection/documents/:documentId', (req, res, next) => {
  documentController.performOperation(req, 'save')
    .then(document => {
      res.render('main/document',
        {
          connections: connectionManager.connections,
          document: document,
          success: 1,
          user: req.decoded
        })
    })
    .catch(err => {
      console.log(err)
      res.render('error')
    })
})

router.delete('/:database/collections/:collection/documents/:documentId', (req, res, next) => {
  documentController.performOperation(req, 'delete')
    .then(() => {
      res.redirect(303, `/main/databases/${req.params.database}/collections/${req.params.collection}`)
    })
    .catch(err => {
      console.log(err)
      res.render('error')
    })
})

module.exports = router
