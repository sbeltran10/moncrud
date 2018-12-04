let password = document.getElementById('password')
let confirmPassword = document.getElementById('confirm-password')

function validatePassword () {
  if (password.value !== confirmPassword.value) {
    confirmPassword.setCustomValidity("Passwords Don't Match")
  } else {
    confirmPassword.setCustomValidity('')
  }
}

password.onchange = validatePassword
confirmPassword.onkeyup = validatePassword
