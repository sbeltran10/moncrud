const jwt = require('jsonwebtoken')
const dataManager = require('../../services/data-manager')

module.exports = {
  verifyToken: (req, res, next) => {
    let token = req.cookies['Authorization']
    if (token) {
      let appSecret = dataManager.read(dataManager.CONFIG_STORE).appSecret
      jwt.verify(token.split(' ')[1], appSecret, (err, decoded) => {
        if (err) {
          res.clearCookie('Authorization')
          res.redirect('/')
        } else {
          req.decoded = decoded
          next()
        }
      })
    } else {
      res.clearCookie('Authorization')
      res.redirect('/')
    }
  }
}
