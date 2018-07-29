const mongoose = require('mongoose');

const { Schema } = mongoose;

const schemaCoachs = new Schema({
  name: String,
  gender: { type: String, enum: ['MALE', 'FEMALE'] },
  review: String,
  photo: String,
  status: { type: String, enum: ['ENABLE', 'DISABLED', 'DELETED'], default: 'ENABLE' },
  created: Date,
});

const Coachs = mongoose.model('coach', schemaCoachs);

module.exports = Coachs;

