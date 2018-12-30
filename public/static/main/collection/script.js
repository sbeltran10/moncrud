const SORT_SPLIT = 'sort--'

const sort = function (paramKey, order) {
  let hiddenSortInputs = document.getElementsByClassName('sort-input')
  for (const input of hiddenSortInputs) {
    input.value = ''
  }
  let sortInput = document.getElementById(SORT_SPLIT + paramKey)
  sortInput.value = sortInput.value == order ? '' : order
  document.getElementById('col-form').submit()
}
