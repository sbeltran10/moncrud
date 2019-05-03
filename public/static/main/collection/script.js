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

$('document').ready(function () {
  let dataSource = []
  for (let i = 1; i <= collectionCount; i++) {
    dataSource.push(i)
  }
  $('#pagination-container').pagination({
    dataSource,
    pageNumber: page != 0 ? page : 1,
    pageSize: 50,
    totalNumber: dataSource.length,
    callback: function (data, pagination) {
      $('#pagination-container').html(pagination.el)

      const queryParams = window.location.search

      $('.paginationjs-prev a').first().attr("href", `${currentRoute}/page/${(Number(page != 0 ? page : 1)-1)}${queryParams}`)
      $('.paginationjs-next a').first().attr("href", `${currentRoute}/page/${(Number(page != 0 ? page : 1)+1)}${queryParams}`)

      $('.paginationjs-page a').each(function (i) {
        let pageNumber = $(this).text()
        $(this).attr('href', `${currentRoute}/page/${(pageNumber)}${queryParams}`)
      })
    }
  })
})

