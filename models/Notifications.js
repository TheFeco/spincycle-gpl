const mongoose = require('mongoose');

const { Schema } = mongoose;

const schemaNotifications = new Schema({
  message: String,
  title: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  type: { type: String, enum: ['ANNOUNCEMENT', 'RECORDATORY'] },
  status: { type: String, enum: ['ENABLE', 'DISABLED', 'DELETED'], default: 'ENABLE' },
  created: Date,
});

const Notifications = mongoose.model('notifications', schemaNotifications);

module.exports = Notifications;

