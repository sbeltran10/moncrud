/* eslint no-extend-native: 0 */
const changeCase = require('change-case')

module.exports = () => {
  Object.defineProperty(String.prototype, 'prettyTitleCase', {
    value () {
      return changeCase.titleCase(this)
    }
  })
}
