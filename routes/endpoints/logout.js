const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  res.clearCookie('Authorization')
  res.redirect('/')
})

module.exports = router
