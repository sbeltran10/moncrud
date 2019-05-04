module.exports = {
  identifyAndAddField: (fieldList, key, document) => {
    fieldList.push(processType(key, document))
  }
}

const simpleTypes = ['String', 'Number', 'Boolean', 'ObjectID', 'Date']

const processType = (key, document) => {
  if (document.hasOwnProperty(key)) {
    const propValue = document[key]
    if (propValue === null) {
      return { key, inputType: null, objectType: null }
    } else {
      const objectType = propValue.constructor ? propValue.constructor.name : 'None'
      let inputType
      let nested
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
        case 'Array':
          if (isSimpleArray(propValue)) {
            inputType = 'simplearray'
          } else {
            inputType = 'complexarray'
          }
          break
        case 'Object':
          inputType = 'nested'
          nested = addNested(propValue)
          break
        default:
          inputType = 'na'
          break
      }

      return { key, inputType, objectType, nested }
    }
  }
}

const isSimpleArray = (propValue) => {
  for (const item of propValue) {
    const constructor = item.constructor
    if (!constructor || !simpleTypes.includes(constructor.name)) {
      return false
    }
  }
  return true
}

const addNested = (propValue) => {
  let nestedProps = []
  for (const nestedKey in propValue) {
    nestedProps.push(processType(nestedKey, propValue))
  }
  return nestedProps
}
