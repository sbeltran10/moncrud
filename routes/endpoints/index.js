const express = require('express')
const router = express.Router()
const authenticationController = require('../controllers/authentication')

router.get('/', (req, res, next) => {
  if (!req.app.locals.setup) {
    res.redirect('/setup')
  } else {
    if (req.cookies['Authorization']) res.redirect('/main')
    else res.render('authentication', { wrongCredentials: req.query.wrongCredentials === '1' })
  }
})

router.post('/', (req, res, next) => {
  if (!req.app.locals.setup) {
    res.redirect('/setup')
  } else {
    authenticationController.login(req)
      .then(result => {
        if (!result) res.redirect('/?wrongCredentials=1')
        else {
          res.cookie('Authorization', 'Bearer ' + result).redirect('/main')
        }
      })
  }
})

module.exports = router
