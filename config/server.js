const https = require('https')
const fs = require('fs')
const http = require('http')

module.exports = app => {
  if (process.env.NODE_ENV === 'production') {
    const options = {
      cert: fs.readFileSync(process.env.CERT_FOLDER),
      key: fs.readFileSync(process.env.KEY_FOLDER)
    }
    return https.createServer(options, app)
  } else {
    return http.createServer(app)
  }
}
