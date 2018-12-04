const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const DBConnection = require('../models/db-connection')
const dataManager = require('./data-manager')

const DEFAULT_OPS = {
  useNewUrlParser: true
}

const connectionManager = {

  connections: {},

  addNew: connectionData =>
    new Promise((resolve, reject) => {
      const connection = MongoClient.connect(connectionData.uri, DEFAULT_OPS)
      connection
        .then(() => {
          connectionManager.connections[connectionData.name] = (
            new DBConnection(connectionData, connection)
          )
          dataManager.save({ key: connectionData.name, value: connectionData }, dataManager.DB_STORE)
          resolve()
        })
        .catch(err => {
          console.log(err)
          reject(err)
        })
    }),

  loadConnections: () =>
    new Promise(resolve => {
      let databaseData = dataManager.read(dataManager.DB_STORE)
      let performConnections = []
      for (const dbKey in databaseData) {
        const dbdata = databaseData[dbKey]
        performConnections.push(connectToDb(dbdata))
      }
      Promise.all(performConnections)
        .then(() => {
          resolve()
        })
    })

}
module.exports = connectionManager

const connectToDb = dbdata => {
  return new Promise((resolve) => {
    const connection = MongoClient.connect(dbdata.uri, DEFAULT_OPS)
    connection
      .then(() => {
        connectionManager.connections[dbdata.name] = new DBConnection(dbdata, connection)
        resolve()
      })
      .catch(err => {
        connectionManager.connections[dbdata.name] = new DBConnection(dbdata, null, err)
        resolve()
      })
  })
}
