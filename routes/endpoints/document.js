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
          previousPage: '../' + req.params.collection,
          success: req.query.success
        })
    })
    .catch(err => {
      console.log(err)
      res.render('error')
    })
})

router.post('/:database/:collection/:documentId', (req, res, next) => {
  documentController.saveData(req)
    .then(() => {
      res.redirect(`/main/${req.params.database}/${req.params.collection}/${req.params.documentId}?success=1`)
    })
    .catch(err => {
      console.log(err)
      res.render('error')
    })
})

module.exports = router
