const ObjectID = require('mongodb').ObjectID

module.exports = class {
  constructor (_id) {
    this._id = new ObjectID(_id)
    this.data = {}
    this.fieldList = []
  }

  loadData (db, collection) {
    return new Promise((resolve, reject) => {
      db.collection(collection).findOne({ _id: this._id })
        .then(document => {
          for (const key in document) {
            if (document.hasOwnProperty(key)) {
              this.fieldList.push(key)
            }
          }
          this.data = document
          resolve(this)
        })
    })
  }
}
