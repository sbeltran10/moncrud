const bcrypt = require('bcrypt')
const dataManager = require('./data-manager')
const jwt = require('jsonwebtoken')
const saltRounds = 10

module.exports = {
  encryptPassword: password => {
    return bcrypt.hash(password, saltRounds)
  },

  comparePassword: (username, password) => {
    let userData = dataManager.read(dataManager.USER_STORE)
    return bcrypt.compare(password, userData[username].password)
  },

  generateJWT: username => {
    let configData = dataManager.read(dataManager.CONFIG_STORE)
    return jwt.sign(
      {
        username: username
      },
      configData.appSecret
    )
  }
}
