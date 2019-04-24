const Document = require('../models/document')
const connectionManager = require('../services/connection-manager')

module.exports = {

  performOperation: (req, operation) => {
    const connection = connectionManager.connections[req.params.database].connection
    return new Promise((resolve, reject) => {
      connection
        .then(client => {
          const documentObj = new Document(req.params.documentId)
          const db = client.db(req.params.database)
          switch (operation) {
            case 'save':
              return documentObj.saveData(db, req.params.collection, req.body)
            case 'delete':
              return documentObj.deleteData(db, req.params.collection)
            default:
              return documentObj.loadData(db, req.params.collection)
          }
        })
        .catch(err => console.log('Connection error ' + err))
        .then((document) => {
          resolve(document)
        })
        .catch(err => reject(err))
    })
  }
}
