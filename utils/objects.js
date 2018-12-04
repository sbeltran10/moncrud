module.exports = {
  hasProps: object => {
    for (var key in object) {
      if (object.hasOwnProperty(key)) {
        return true
      }
    }
    return false
  }
}
