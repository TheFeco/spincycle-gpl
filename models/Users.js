const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const schemaUsers = new Schema({
  name: String,
  lastName: String,
  phone: String,
  type: { type: String, enum: ['ADMIN', 'CLIENT'], default: 'CLIENT' },
  user: String,
  password: String,
  status: { type: String, enum: ['ENABLE', 'DISABLED', 'DELETED'], default: 'ENABLE' },
  created: Date,
});

schemaUsers.pre('save', function checkt(next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, (error, hash) => {
      if (error) {
        return next(error);
      }
      user.password = hash;
      next();
    });
  });
});

const User = mongoose.model('users', schemaUsers);

module.exports = User;
