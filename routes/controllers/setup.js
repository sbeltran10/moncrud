const userManager = require('../services/user-manager')

module.exports = {
  createAdminUser: req => {
    return new Promise((resolve, reject) => {
      if (!req.body.username) {
        reject(new Error('No data'))
      } else {
        req.body.role = 'admin'
        userManager.addNew(req.body)
          .then(() => {
            req.app.locals.setup = true
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      }
    })
  }
}
