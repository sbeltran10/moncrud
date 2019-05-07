const Collection = require('../models/collection')
const connectionManager = require('../services/connection-manager')

module.exports = {
  performOperation: (req, operation) => {
    console.log(req.params)
    const connection = connectionManager.connections[req.params.database].connection
    return new Promise((resolve, reject) => {
      connection
        .then(client => {
          const collectionObj = new Collection(req.params.collection)
          const db = client.db(req.params.database)
          switch (operation) {
            case 'create-form':
              return collectionObj.getFormData(db, req.query, req.params.page)
            case 'create':
              return collectionObj.createDocument(db, req.body)
            default:
              return collectionObj.loadData(db, req.query, req.params.page)
          }
        })
        .catch(err => console.log('Connection error ' + err))
        .then((data) => {
          resolve(data)
        })
        .catch(err => reject(err))
    })
  }
}
