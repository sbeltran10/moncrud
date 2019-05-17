require('dotenv').config()
const express = require('express')
const routes = require('./routes')
const config = require('./config')

const app = express()

config.initial(app)
routes(app)
config.afterRoutes(app)

module.exports = app
