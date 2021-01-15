const express = require('express')
const gearSwap =express.Router()




gearSwap.get('/', (req, res) => {
  res.send('hello buddy')
})

module.exports = gearSwap
