module.exports = {
  identifyAndAddField (fieldList, key, document) {
    if (document.hasOwnProperty(key)) {
      if (document[key] === null) {
        fieldList.push({ key, inputType: null, objectType: null })
      } else {
        const objectType = typeof document[key]
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
        fieldList.push({ key, inputType, objectType })
      }
    }
  }
}
