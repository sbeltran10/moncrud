const Store = require('data-store')
const nanoid = require('nanoid')
const objectUtils = require('../utils/objects')

const configStore = new Store({ path: 'data/config.json' })
const userStore = new Store({ path: 'data/users.json' })

module.exports = (app) => {
  let configData = configStore.data
  if (!configData.appSecret) {
    // Generate secret key for app
    console.log('Generating secret key....')
    configStore.set('appSecret', nanoid(44))
  }

  let userData = userStore.data
  if (objectUtils.hasProps(userData)) {
    app.locals.setup = true
  }
}
