const express = require('express')
const documentController = require('../controllers/document')
const connectionManager = require('../services/connection-manager')
const router = express.Router()

router.get('/:database/:collection/:documentId', (req, res, next) => {
  documentController.getData(req)
    .then(document => {
      res.render('main/document',
        {
          connections: connectionManager.connections,
          document: document,
          previousPage: '../' + req.params.collection
        })
    })
    .catch(err => {
      console.log(err)
      res.render('error')
    })
})

module.exports = router
