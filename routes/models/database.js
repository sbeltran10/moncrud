module.exports = class {
  constructor (name) {
    this.name = name
    this.collections = []
  }

  loadData (db, parameters) {
    return new Promise((resolve) => {
      db.listCollections().toArray()
        .then(collections => {
          collections.forEach(col => {
            let addCol = false
            if (parameters.filter) {
              if (col.name.includes(parameters.filter)) {
                addCol = true
              }
            } else {
              addCol = true
            }
            if (addCol) {
              this.collections.push(col.name)
            }
          })
          this.collections.sort()
          resolve(this)
        })
    })
  }
}
