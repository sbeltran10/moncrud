let selectChange = function (select) {
  let fieldName = select.id.substring(0, select.id.indexOf('---option-type'))
  let newElement = generateInput(select.value, fieldName)

  let inputCol = $(`#${fieldName}---col`)
  inputCol.empty()
  inputCol.append(newElement)
}

let addField = function () {
  let fieldName = document.getElementById("new-field").value
  console.log(fieldName)
}

let generateInput = function (inputType, inputName) {
  switch (inputType) {
    case 'number':
      return $(`<input class="value-input justify-content-start" name="${inputName}" type="number">`)
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