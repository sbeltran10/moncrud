const clearFilter = function () {
  let filterInput = document.getElementById('filter-db')
  filterInput.value = ''
  document.getElementById('filter-form').submit()
}