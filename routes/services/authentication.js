const bcrypt = require('bcrypt')
const dataManager = require('./data-manager')
const jwt = require('jsonwebtoken')
const saltRounds = 10

module.exports = {
  encryptPassword: password => {
    return bcrypt.hash(password, saltRounds)
  },

  comparePassword: (username, password) => {
    return new Promise((resolve, reject) => {
      let userData = dataManager.read(dataManager.USER_STORE)
      bcrypt.compare(password, userData[username].password)
        .then(result => {
          if (result) {
            resolve({
              username: username,
              role: userData[username].role
            })
          } else { resolve(false) }
        })
        .catch((err) => reject(err))
    })
  },

  generateJWT: userData => {
    let configData = dataManager.read(dataManager.CONFIG_STORE)
    return jwt.sign(
      userData,
      configData.appSecret
    )
  }
}
