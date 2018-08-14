const mongoose = require('mongoose');

const { Schema } = mongoose;

const schemaSchedules = new Schema({
  day: String,
  order: String,
  hour: String,
  ampm: { type: String, enum: ['AM', 'PM'] },
  status: { type: String, enum: ['ENABLE', 'DISABLED', 'DELETED'], default: 'ENABLE' },
  created: Date
});

const Schedules = mongoose.model('schedules', schemaSchedules);

module.exports = Schedules;
