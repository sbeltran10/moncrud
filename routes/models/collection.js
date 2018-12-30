//  const Document = require('./collection')

const SORT_SPLIT = 'sort--'
const PAGE_SIZE = 30

module.exports = class {
  constructor (name) {
    this.name = name
    this.fields = {}
    this.fieldList = []
    this.documents = []
  }

  loadData (db, parameters, page = 0) {
    return new Promise((resolve, reject) => {
      this.getFieldsAndDocuments(db.collection(this.name), parameters, page)
        .then(() => resolve(this))
        .catch((err) => reject(err))
    })
  }

  getFieldsAndDocuments (collection, parameters, page) {
    return new Promise((resolve, reject) => {
      collection.find(this.buildQueryObj(parameters)).sort(this.buildSortObj(parameters)).skip(page * PAGE_SIZE).limit(PAGE_SIZE).toArray()
        .then(documents => {
          documents.forEach(document => {
            for (const key in document) {
              if (document.hasOwnProperty(key) && document[key]) {
                if (!this.fields[key]) {
                  this.fields[key] = {
                    key: key,
                    type: typeof document[key]
                  }
                } else if (this.fields[key].type !== typeof document[key]) { // eslint-disable-line
                  this.fields[key].type = 'mixed'
                }
              }
            }
          })
          this.fieldList = Object.values(this.fields)
          this.documents = documents
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
    // TODO: Modify to take into account different types
    let queryObj = {}
    for (const key in parameters) {
      if (parameters.hasOwnProperty(key) && !key.startsWith(SORT_SPLIT) && parameters[key]) {
        queryObj[key] = { $regex: parameters[key], $options: 'i' }
      }
    }
    return queryObj
  }
}
