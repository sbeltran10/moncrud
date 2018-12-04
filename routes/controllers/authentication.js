const authenticationService = require('../services/authentication')

module.exports = {
  login: req => {
    return new Promise((resolve, reject) => {
      authenticationService.comparePassword(req.body.username, req.body.password)
        .then(result => {
          if (result) {
            resolve(authenticationService.generateJWT(req.body.username))
          } else resolve(false)
        })
        .catch(err => {
          // TODO: Do something with error
          console.log(err)
          reject(err)
        })
    })
  }
}
