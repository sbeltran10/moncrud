const Database = require('../models/database')
const connectionManager = require('../services/connection-manager')

module.exports = {
  getData: req => {
    const connection = connectionManager.connections[req.params.database].connection
    return new Promise((resolve, reject) => {
      connection
        .then(client => {
          const databaseObj = new Database(req.params.database)
          const db = client.db(req.params.database)
          return databaseObj.loadData(db, req.query)
        })
        .catch(err => console.log('Connection error ' + err))
        .then((db) => {
          resolve(db)
        })
        .catch(err => reject(err))
    })
  }
}
