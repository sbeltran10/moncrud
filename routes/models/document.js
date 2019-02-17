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
            this.identifyAndAddField(key, document)
          }
          this.data = document
          resolve(this)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  identifyAndAddField (key, document) {
    if (document.hasOwnProperty(key)) {
      if (document[key] === null) {
        this.fieldList.push({ key, inputType: null, objectType: null })
      } else {
        const objectType = typeof document[key]
        console.log(objectType)
        let inputType
        switch (objectType) {
          case 'string':
            inputType = 'text'
            break
          case 'number':
            inputType = 'number'
            break
          case 'boolean':
            inputType = 'checkbox'
            break
          default:
            switch (document[key].constructor.name) {
              case 'ObjectID':
                inputType = 'id'
                break
              case 'Date':
                inputType = 'date'
                break
              default:
                inputType = 'object'
                break
            }
            break
        }
        this.fieldList.push({ key, inputType, objectType })
      }
    }
  }

  saveData (db, collection, updateObj) {
    return new Promise((resolve, reject) => {
      console.log(updateObj)
      this.loadData(db, collection)
        .then(() => {
          for (const field of this.fieldList) {
            if (updateObj[field.key]) {
              switch (field.objectType) {
                case 'number':
                  updateObj[field.key] = Number(updateObj[field.key])
                  break
                case 'boolean':
                  updateObj[field.key] = Array.isArray(updateObj[field.key])
                  break
                default:
                  updateObj[field.key] = updateObj[field.key].toString()
                  break
              }
            }
          }
          db.collection(collection).updateOne({ _id: this._id }, { $set: updateObj })
            .then(() => resolve())
            .catch(error => reject(error))
        })
        .catch(error => reject(error))
    })
  }
}
