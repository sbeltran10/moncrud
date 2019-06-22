const express = require('express')
const router = express.Router()
const connectionManager = require('../services/connection-manager')
const userController = require('../controllers/user')

const renderPage = (res, properties) => {
  res.render('main/user',
    {
      ...properties,
      connections: connectionManager.connections,
      users: userController.getUsers(),
      previousPage: '/main'
    })
}

router.get('/', (req, res, next) => {
  renderPage(res, { username: req.decoded.username })
})

router.post('/', (req, res, next) => {
  userController.addNew(req)
    .then((uncryptedPassword) =>
      renderPage(res, {
        sucMessage: `User added sucessfully. This user password is ${uncryptedPassword}. Please write it down as it will not be shown again`,
        user: req.decoded
      })
    )
    .catch((err) =>
      renderPage(res, {
        errMessage: 'An error occured while adding a new user. ' + (err ? err.message : ''),
        user: req.decoded
      })
    )
})

module.exports = router
