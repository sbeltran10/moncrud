const ObjectID = require('mongodb').ObjectID
const common = require('./common')

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
            common.identifyAndAddField(this.fieldList, key, document)
          }
          this.data = document
          resolve(this)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  saveData (db, collection, updateObj) {
    return new Promise((resolve, reject) => {
      this.loadData(db, collection)
        .then(() => {
          for (const field of this.fieldList) {
            if (updateObj[field.key]) {
              switch (field.objectType) {
                case 'Number':
                  updateObj[field.key] = Number(updateObj[field.key])
                  break
                case 'Boolean':
                  updateObj[field.key] = Array.isArray(updateObj[field.key])
                  break
                default:
                  updateObj[field.key] = updateObj[field.key].toString()
                  break
              }
            }
          }
          db.collection(collection).updateOne({ _id: this._id }, { $set: updateObj }, { new: true })
            .then((document) => resolve(document))
            .catch(error => reject(error))
        })
        .catch(error => reject(error))
    })
  }

  deleteData (db, collection) {
    return new Promise((resolve, reject) => {
      db.collection(collection).deleteOne({ _id: this._id })
        .then(() => {
          resolve(this)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}
