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
    const saveStore = getStore(store)
    return saveStore.set(data.key, data.value)
  },

  read: store => {
    const readStore = getStore(store)
    return readStore.data
  },

  delete: (name, store) => {
    const deleteStore = getStore(store)
    return deleteStore.del(name)
  }
}

const getStore = (store) => {
  switch (store) {
    case dataManager.DB_STORE:
      return dbStore
    case dataManager.USER_STORE:
      return userStore
    case dataManager.COLLECTION_STORE:
      return collectionStore
    case dataManager.CONFIG_STORE:
      return configStore
    default:
      return dbStore
  }
}

module.exports = dataManager
