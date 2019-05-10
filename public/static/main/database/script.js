const clearFilter = function () {
  let filterInput = document.getElementById('filter-db')
  filterInput.value = ''
  document.getElementById('filter-form').submit()
}

const removeConnection = function () {
  Swal.fire({
    title: 'Remove this database connection?',
    text: 'Removing this connection will not affect the database on mongodb, it will just remove it from your navigation panel',
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Remove',
    cancelButtonText: 'Cancel',
    confirmButtonColor: '#b20000'
  })
    .then(willDelete => {
      if (willDelete.value) {
        fetch('', {
          method: 'delete',
          redirect: 'follow',
          mode: 'cors'
        })
          .then(function (response) {
            window.location = response.url
          })
          .catch(function (error) {
            console.log(error)
            Swal.fire({
              type: 'error',
              title: 'Operation failed',
              text: 'The data could not be deleted, if this error persist please contact an administrator'
            })
          })
      }
    })
}
