const mongoose = require('mongoose');

const { Schema } = mongoose;

const schemaSchedulesBoughts = new Schema({
  date: Date,
  prince: Number,
  quantity: Number,
  availables: Number,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  plan: {
    type: Schema.Types.ObjectId,
    ref: 'plans'
  },
  status: { type: String, enum: ['ENABLE', 'DISABLED', 'DELETED'], default: 'ENABLE' },
  created: Date,
});

const SchedulesBoughts = mongoose.model('schedules_boughts', schemaSchedulesBoughts);

module.exports = SchedulesBoughts;
