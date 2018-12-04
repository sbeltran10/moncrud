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
    if (userData[username]) return bcrypt.compare(password, userData[username].password)
    else return new Promise((resolve, reject) => { resolve(false) })
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
