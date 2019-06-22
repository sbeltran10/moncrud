const dataManager = require('./data-manager')
const authentication = require('../services/authentication')

const userManager = {
  addNew: userData =>
    new Promise((resolve, reject) => {
      if (!userManager.userExists(userData.username.toLowerCase())) {
        authentication.encryptPassword(userData.password)
          .then(encryptedPassword => {
            dataManager.save({
              key: userData.username.toLowerCase(),
              value: {
                password: encryptedPassword,
                role: userData.role
              }
            }, dataManager.USER_STORE)
            resolve(userData.password)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      } else {
        reject(new Error('Username already exists'))
      }
    }),

  userExists: (username) => {
    return dataManager.read(dataManager.USER_STORE)[username]
  },

  loadUsers: () => {
    const usersObj = dataManager.read(dataManager.USER_STORE)
    let userList = []
    Object.keys(usersObj).forEach(key => {
      userList.push({
        username: key,
        role: usersObj[key].role
      })
    })
    return userList
  }
}

module.exports = userManager
