const Store = require('data-store')

const dbStore = new Store({ path: 'data/databases.json' })
const collectionStore = new Store({ path: 'data/collections.json' })
const userStore = new Store({ path: 'data/users.json' })
const configStore = new Store({ path: 'data/config.json' })

const dataManager = {
  DB_STORE: 'db',
  COLLECTION_STORE: 'collection',
  USER_STORE: 'user',
  CONFIG_STORE: 'config',

  save: (data, store) => {
    let saveStore
    switch (store) {
      case dataManager.DB_STORE:
        saveStore = dbStore
        break
      case dataManager.USER_STORE:
        saveStore = userStore
        break
      case dataManager.COLLECTION_STORE:
        saveStore = collectionStore
        break
      case dataManager.CONFIG_STORE:
        saveStore = configStore
        break
      default:
        saveStore = dbStore
        break
    }

    return saveStore.set(data.key, data.value)
  },

  read: store => {
    let readStore
    switch (store) {
      case dataManager.DB_STORE:
        readStore = dbStore
        break
      case dataManager.USER_STORE:
        readStore = userStore
        break
      case dataManager.COLLECTION_STORE:
        readStore = collectionStore
        break
      case dataManager.CONFIG_STORE:
        readStore = configStore
        break
      default:
        readStore = dbStore
        break
    }

    return readStore.data
  }
}

module.exports = dataManager
