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
        console.log(err)
        res.render('setup')
      })
  }
})

module.exports = router
