const mongoose = require('mongoose');

const { Schema } = mongoose;
const schemaPlans = new Schema({
  name: String,
  price: Number,
  class: Number,

  status: { type: String, enum: ['ENABLE', 'DISABLED', 'DELETED'], default: 'ENABLE' },
  created: Date
});

const Plans = mongoose.model('plans', schemaPlans);

module.exports = Plans;

