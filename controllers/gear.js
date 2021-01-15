const express = require('express')
const gearSwap = express.Router()

const Gear = require('../models/gearswap.js')



gearSwap.get('/', (req, res) => {
  res.send('hello buddy')
})

module.exports = gearSwap
