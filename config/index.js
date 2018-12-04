module.exports = {
  initial: app => {
    require('./setup')(app)
    require('./app')(app)
    require('./util')()
  },

  afterRoutes: app => {
    require('./error-handler')(app)
  }

}
