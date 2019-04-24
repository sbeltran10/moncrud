let deleteData = function () {
  Swal.fire({
    title: 'Delete this entry?',
    text: 'Once deleted, you will not be able to recover this data',
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Delete',
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
