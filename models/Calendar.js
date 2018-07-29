const mongoose = require('mongoose');

const { Schema } = mongoose;

const schemaCalendar = new Schema({
  name: String,
  isOpen: Boolean,
  schedule: {
    type: Schema.Types.ObjectId,
    ref: 'schedule'
  },
  coach: {
    type: Schema.Types.ObjectId,
    ref: 'coach'
  },
  status: { type: String, enum: ['ENABLE', 'DISABLED', 'DELETED'], default: 'ENABLE' },
  created: Date,
});

const Calendar = mongoose.model('calendar', schemaCalendar);

module.exports = Calendar;

