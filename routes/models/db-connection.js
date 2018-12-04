module.exports = class {
  constructor ({ name, uri, options }, connection, connectionError) {
    this.name = name
    this.uri = uri
    this.options = options
    if (connectionError) {
      this.connectionError = connectionError
    } else {
      this.connection = connection
    }
  }
}
