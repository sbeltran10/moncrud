const Collection = require('../models/collection')
const connectionManager = require('../services/connection-manager')

module.exports = {
  getData: req => {
    const connection = connectionManager.connections[req.params.database].connection
    return new Promise((resolve, reject) => {
      connection
        .then(client => {
          const collectionObj = new Collection(req.params.collection)
          const db = client.db(req.params.database)
          return collectionObj.loadData(db, req.query, req.params.page)
        })
        .catch(err => console.log('Connection error ' + err))
        .then((collection) => {
          resolve(collection)
        })
        .catch(err => reject(err))
    })
  }
}
