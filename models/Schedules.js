const mongoose = require('mongoose');

const { Schema } = mongoose;
const schemaSchedules = new Schema({
  day: String,
  order: String,
  hour: String,
  status: { type: String, enum: ['ENABLE', 'DISABLED', 'DELETED'], default: 'ENABLE' },

  created: { type: Date },
});

const Schedules = mongoose.model('schedules', schemaSchedules);

module.exports = Schedules;

