const Users = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

module.exports = {
  create(usersProps) {
    Users.findOne({ user: usersProps.user }).then(user => {
      if (user === null) {
        const users = new Users(usersProps);
        users.save().then(user => { return { data: user }});
      }
      else {
        return { data: user }
      }
    })
  },

  delete(_id) {
    return Users.findByIdAndRemove({ _id });
  },

  edit(_id, usersProps) {
    return Users.findByIdAndUpdate({ _id }, usersProps);
  },

  find(_id) {
    return Users.findById(_id);
  },

  findAll() {
    return Users.find({ status: { $ne: 'DELETED' } });
  },

  login(credentials) {
    return Users.findOne({ user: credentials.user, status: 'ENABLE' }).then((user) => {
      if (user) {
        return bcrypt.compare(credentials.password, user.password).then((isMatch) => {
          return new Promise((resolve, reject) => {
            if (isMatch === false) {
              reject(new Error('no el password'));
            }

            const token = jwt.sign(
              {
                user: _.pick(user, ['_id', 'name', 'type', 'user'])
              },
              process.env.JWT_SECRET,
              {
                expiresIn: '30d'
              }
            );
            user.jwt = token;
            resolve(user);
          }).catch(error => new Error(error));
        });
      }
      else {
        return { data: null }
      }
    });
  }
};
