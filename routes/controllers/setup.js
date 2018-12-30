const dataManager = require('../services/data-manager')
const authentication = require('../services/authentication')

module.exports = {
  createAdminUser: req => {
    return new Promise((resolve, reject) => {
      if (!req.body.username) {
        reject(new Error('No data'))
      } else {
        authentication.encryptPassword(req.body.password)
          .then(encryptedPassword => {
            dataManager.save({
              key: req.body.username,
              value: {
                password: encryptedPassword
              }
            }, dataManager.USER_STORE)
            req.app.locals.setup = true
            resolve()
          })
          .catch(err => {
            //TODO: do something with the error
            console.log(err)
            reject(err)
          })
      }
    })
  }
}
