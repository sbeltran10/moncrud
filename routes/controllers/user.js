const userManager = require('../services/user-manager')
const randomstring = require('randomstring')

module.exports = {
  addNew: (req) => {
    const randomPassword = randomstring.generate(8)
    const userData = {
      username: req.body.username,
      password: randomPassword,
      role: req.body.role
    }
    return userManager.addNew(userData)
  },

  getUsers: () => {
    return userManager.loadUsers()
  }
}
