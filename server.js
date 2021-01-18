//DEPENDENCIES
const express = require('express')
const mongoose = require('mongoose')
// CONFIGURATION
const app = express()
require('dotenv').config()
const PORT = process.env.PORT
const PROJECT3_DB = process.env.PROJECT3_DB
// MIDDLEWARE
app.use(express.json()) //use .json(), not .urlencoded()
app.use(express.static('public'))

//CONTROLLER
const gearController = require('./controllers/gear.js')
app.use('/gearswap', gearController)

//BODY PARSER
mongoose.connect(PROJECT3_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
// Error/success
mongoose.connection.on('error', err =>
  console.log(
    err.message,
    ' is Mongod not running?/Problem with Atlas Connection?'
  )
)
mongoose.connection.on('connected', () =>
  console.log('mongo connected: ', PROJECT3_DB)
)
mongoose.connection.on('disconnected', () => console.log('mongo disconnected'))

// LISTENER
app.listen(PORT, () => {
  console.log('listening on port', PORT)
})
