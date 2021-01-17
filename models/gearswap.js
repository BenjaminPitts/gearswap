const mongoose = require('mongoose')

const gearSchema = new mongoose.Schema({
  type: { type: String, required: true },
  make: { type: String, required: true },
  model: String,
  condition: String,
  price: Number,
  seller: String,
  image: String
})
const Gear = mongoose.model('Gear', gearSchema)

module.exports = Gear
