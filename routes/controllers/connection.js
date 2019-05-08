const connectionManager = require('../services/connection-manager')

module.exports = {
  connectNew: (req) => {
    return connectionManager.addNew(req.body)
  }
}
