const express = require('express')
const router = express.Router()
const setupController = require('../controllers/setup')

router.get('/', (req, res, next) => {
  if (req.app.locals.setup) {
    res.redirect('/')
  } else {
    res.render('setup')
  }
})

router.post('/', (req, res, next) => {
  if (req.app.locals.setup) {
    res.redirect('/')
  } else {
    setupController.createAdminUser(req)
      .then(() => {
        res.redirect('/')
      })
      .catch(err => {
        // Figure out what to do with error
        console.log(err)
      })
  }
})

module.exports = router
