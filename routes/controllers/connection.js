const connectionManager = require('../services/connection-manager')

module.exports = {
  connectNew: (req) => {
    connectionManager.addNew(req.body)
      .then(() => {
        console.log('Connection added')
      })
  }
}
