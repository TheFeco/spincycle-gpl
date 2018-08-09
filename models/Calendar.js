const mongoose = require('mongoose');

const { Schema } = mongoose;

const schemaCalendar = new Schema({
  isOpen: { type: Boolean, default: true },
  dateOfCalendar: Date,
  schedule: {
    type: Schema.Types.ObjectId,
    ref: 'schedules'
  },
  coach: {
    type: Schema.Types.ObjectId,
    ref: 'coachs',
    default: null
  },
  status: { type: String, enum: ['ENABLE', 'DISABLED', 'DELETED'], default: 'ENABLE' },
  created: Date
});

const Calendar = mongoose.model('calendar', schemaCalendar);

module.exports = Calendar;
