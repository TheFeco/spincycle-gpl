const mongoose = require('mongoose');

const { Schema } = mongoose;

const schemaReservations = new Schema({
  calendarId: {
    type: Schema.Types.ObjectId,
    ref: 'calendar'
  },
  day: Date,
  canceledDate: Date,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  bike: { type: Number, enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
  status: { type: String, enum: ['ACTIVE', 'CANCELED', 'DELETED'], default: 'ACTIVE' },
  created: Date,
});

const Reservations = mongoose.model('reservations', schemaReservations);

module.exports = Reservations;
