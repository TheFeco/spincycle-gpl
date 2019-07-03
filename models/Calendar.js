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
  reservations: [
    {
      type: Schema.Types.ObjectId,
      ref: 'reservations'
    }
  ],
  status: { type: String, enum: ['ENABLE', 'DISABLED', 'DELETED'], default: 'ENABLE' },
  created: Date,
  subscriptions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'users'
    }
  ]
});

const Calendar = mongoose.model('calendar', schemaCalendar);

module.exports = Calendar;
