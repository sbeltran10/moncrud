module.exports = class {
  constructor (name) {
    this.name = name
    this.collections = []
  }

  loadData (db) {
    return new Promise((resolve) => {
      db.listCollections().toArray()
        .then(collections => {
          collections.forEach(col => {
            this.collections.push(col.name)
          })
          resolve(this)
        })
    })
  }
}
