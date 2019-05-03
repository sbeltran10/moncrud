module.exports = {
  identifyAndAddField (fieldList, key, document) {
    if (document.hasOwnProperty(key)) {
      if (document[key] === null) {
        fieldList.push({ key, inputType: null, objectType: null })
      } else {
        const propValue = document[key]
        const objectType = propValue.constructor ? propValue.constructor.name : 'None'
        let inputType
        switch (objectType) {
          case 'String':
            inputType = 'text'
            break
          case 'Number':
            inputType = 'number'
            break
          case 'Boolean':
            inputType = 'checkbox'
            break
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
        fieldList.push({ key, inputType, objectType })
      }
    }
  }
}
