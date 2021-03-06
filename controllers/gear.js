const express = require('express')
const gearSwap =express.Router()
const Gear = require('../models/gearswap.js')
const gearSeed = require('../models/gear_seed.js')
gearSwap.get('/', (req, res) => {
  Gear.find({}, (err, foundGear) => {
    res.json(foundGear)
  })
})

gearSwap.post('/', (req, res) => {
  Gear.create(req.body, (err, createdGear) => {
    Gear.find({}, (err, foundGear) => {
      res.json(foundGear)
    })
  })
})

gearSwap.put('/:id', (req, res) => {
  Gear.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedGear) => {
      if (err) {
        res.send(err)
     } else {
       Gear.find({}, (err, foundGear) => {
         res.json(foundGear)
       })
     }
    }
  )
})

gearSwap.delete('/:id', (req, res) => {
  Gear.findByIdAndRemove(req.params.id, (err, deletedGear) => {
    Gear.find({}, (err, foundGear) => {
      res.json(foundGear)
    })
  })
})
gearSwap.get('/seed', (req, res) => {
  Gear.insertMany(gearSeed, (err, manyGear) => {
    res.redirect('/')
  })
})


module.exports = gearSwap
