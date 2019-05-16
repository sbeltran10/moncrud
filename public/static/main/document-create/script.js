let selectChange = function (select) {
  let fieldName = select.id.substring(0, select.id.indexOf('---option-type'))
  let newElement = generateInput(select.value, fieldName)

  let inputCol = $(`#${fieldName}---col`)
  inputCol.empty()
  inputCol.append(newElement)
}

let addField = function () {
  let fieldName = document.getElementById('new-field').value
  let regex = RegExp('^[A-Za-z].*')

  if (!fieldName || !regex.test(fieldName)) {
    Swal.fire({
      type: 'error',
      title: 'Operation failed',
      text: 'The field name must start with a letter'
    })
  } else {
    let elementExists = document.getElementsByName(changeCase.camelCase(fieldName))
    if (elementExists.length > 0) {
      Swal.fire({
        type: 'error',
        title: 'Operation failed',
        text: 'A field already exist with that name, please choose another name'
      })
    } else {
      let newElement = generateFieldElements(fieldName)
      $('#fields-col').append(newElement)
    }
  }

  document.getElementById('new-field').value = ''
}

let generateInput = function (inputType, inputName) {
  switch (inputType) {
    case 'number':
      return $(`<input class="value-input justify-content-start" name="${inputName}" type="number" step="any">`)
    case 'checkbox':
      let checkContainer = $(`<label class="check-container"></label>`)
      let inputVisible = $(`<input class="value-input" name="${inputName}" type="checkbox" value="true">`)
      let inputHidden = $(`<input class="value-input" name="${inputName}" type="hidden" value="false">`)
      let spanCheck = $(`<span class="checkmark"></span>`)

      checkContainer.append(inputVisible)
      checkContainer.append(inputHidden)
      checkContainer.append(spanCheck)
      return checkContainer
    default:
      return $(`<input class="value-input justify-content-start" name="${inputName}" type="text">`)
  }
}

let generateFieldElements = function (inputName) {
  let mainRow = $(`<div id="${inputName}---row" class="row property"></div>`)

  // Pretty title case
  let fieldNameCol = $(`<div class="col-2 field align-self-center">${changeCase.titleCase(inputName)}</div>`)
  let selectGroup = $(
    `<div class="col-auto align-self-center">
    <select class="value-input" id="${changeCase.camelCase(inputName)}---option-type" name="${inputName}___input_type" onchange="selectChange(this)">
      <option value="text" selected=true >Text</option>
      <option value="number"  >Number</option>
      <option value="checkbox"  >True/False</option>
    </select>
  </div>`)
  let valueCol = $(`<div class="col-6 value align-self-center d-flex" id="${changeCase.camelCase(inputName)}---col"></div>`)
  let valueInput = generateInput('text', changeCase.camelCase(inputName))
  let removeCol = $(`<div class="col-auto align-self-center">
    <span class="remove-icon" onclick="removeField('${inputName}')"><i class="fas fa-times"></i></span>
  </div>`)

  valueCol.append(valueInput)

  mainRow.append(fieldNameCol)
  mainRow.append(selectGroup)
  mainRow.append(valueCol)
  mainRow.append(removeCol)

  return mainRow
}

let removeField = function (field) {
  $(`#${field}---row`).remove()
}