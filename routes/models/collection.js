const common = require('./common')
const SORT_SPLIT = 'sort--'
const PAGE_SIZE = 50
const ObjectID = require('mongodb').ObjectID

module.exports = class {
  constructor (name) {
    this.name = name
    this.fields = {}
    this.fieldList = []
    this.documents = []
    this.count = 0
  }

  loadData (db, parameters, page = 1) {
    return new Promise((resolve, reject) => {
      this.getFieldsAndDocuments(db.collection(this.name), parameters, page)
        .then(() => {
          return this.countDocuments(db)
        })
        .then(() => resolve(this))
        .catch((err) => reject(err))
    })
  }

  getFieldsAndDocuments (collection, parameters, page, loadDocuments = true) {
    return new Promise((resolve, reject) => {
      let createdId
      if (parameters.createdId) {
        createdId = parameters.createdId
        delete parameters.createdId
      }

      collection.find(this.buildQueryObj(parameters)).sort(this.buildSortObj(parameters)).skip((page - 1) * PAGE_SIZE).limit(PAGE_SIZE).toArray()
        .then(documents => {
          documents.forEach(document => {
            this.getFieldsAndDocument(document)
          })

          if (loadDocuments) this.documents = documents
          if (createdId && !this.documents.find((doc) => doc._id.toString() === createdId)) {
            return collection.findOne({ _id: new ObjectID(createdId) })
          } else {
            this.fieldList = Object.values(this.fields)
            resolve()
          }
        })
        .then((document) => {
          if (document) {
            this.getFieldsAndDocument(document)
            this.fieldList = Object.values(this.fields)
            this.documents = [document, ...this.documents]
          }
          console.log(this.fields)
          resolve()
        })
        .catch(err => {
          console.log(err)
          reject(err)
        })
    })
  }

  buildSortObj (parameters) {
    let sortObj = {}
    for (const key in parameters) {
      if (parameters.hasOwnProperty(key) && key.startsWith(SORT_SPLIT) && parameters[key]) {
        const paramName = key.split(SORT_SPLIT)[1]
        sortObj[paramName] = Number(parameters[key])
      }
    }
    return sortObj
  }

  buildQueryObj (parameters) {
    let queryObj = {}
    for (const key in parameters) {
      if (parameters.hasOwnProperty(key) && !key.startsWith(SORT_SPLIT) && parameters[key]) {
        queryObj[key] = { $regex: parameters[key], $options: 'i' }
      }
    }
    return queryObj
  }

  getFormData (db, parameters, page = 1) {
    return new Promise((resolve, reject) => {
      this.getFieldsAndDocuments(db.collection(this.name), parameters, page, false)
        .then(() => {
          this.fieldList.forEach((field, index) => {
            let inputType
            switch (field.type) {
              case 'String':
                inputType = 'text'
                break
              case 'Number':
                inputType = 'number'
                break
              case 'Boolean':
                inputType = 'checkbox'
                break
              default:
                inputType = 'na'
                break
            }
            this.fieldList[index].inputType = inputType
          })

          this.fieldList = this.fieldList.filter(field => field.inputType !== 'na' && field.key !== '_id')
          resolve(this)
        })
        .catch((err) => reject(err))
    })
  }

  createDocument (db, object) {
    const newDocument = JSON.parse(JSON.stringify(object))
    const inputTypeSeparator = '___input_type'
    return new Promise((resolve, reject) => {
      for (const key in newDocument) {
        if (newDocument.hasOwnProperty(key) && newDocument[key]) {
          if (key.indexOf(inputTypeSeparator) !== -1) {
            const inputKey = key.substr(0, key.lastIndexOf(inputTypeSeparator))
            switch (newDocument[key]) {
              case 'number':
                newDocument[inputKey] = Number(newDocument[inputKey])
                break
              case 'checkbox':
                newDocument[inputKey] = Array.isArray(newDocument[inputKey])
                break
              default:
                newDocument[inputKey] = newDocument[inputKey].toString()
                break
            }
            delete newDocument[key]
          }
        }
      }
      db.collection(this.name).insertOne(newDocument)
        .then((result) => {
          resolve(result.insertedId)
        })
        .catch((err) => reject(err))
    })
  }

  countDocuments (db) {
    return new Promise((resolve, reject) => {
      db.collection(this.name).countDocuments({}, { maxTimeMS: 5000 })
        .then((result) => {
          this.count = result
          resolve()
        })
        .catch((err) => {
          if (err.code === 50) {
            resolve()
          } else {
            reject(err)
          }
        })
    })
  }

  getFieldsAndDocument (document) {
    for (const key in document) {
      const propValue = document[key]
      if (document.hasOwnProperty(key) && (propValue !== null && propValue !== undefined)) {
        let type = propValue.constructor ? propValue.constructor.name : 'None'
        if (!this.fields[key]) {
          if (type === 'Array') {
            if (common.isSimpleArray(propValue)) {
              type = 'SimpleArray'
            } else {
              type = 'ComplexArray'
            }
          }
          console.log(type)
          this.fields[key] = {
            key: key,
            type
          }
        } else if (this.fields[key].type !== type) { // eslint-disable-line
          this.fields[key].type = 'Mixed'
        }
      }
    }
  }
}
