const https = require('https')
const fs = require('fs')

module.exports = app => {
  const options = {
    cert: fs.readFileSync(process.env.CERT_FOLDER),
    key: fs.readFileSync(process.env.KEY_FOLDER)
  }
  return https.createServer(options, app)
}
