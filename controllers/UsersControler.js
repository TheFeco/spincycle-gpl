const Users = require('../models/Users')
const Calendar = require('../models/Calendar')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const webpush = require('web-push')

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

	console.log({ user })
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
  },

  saveSuscription(_id, subscription) {
    Users.findById({ _id }).then((user) => {
      console.log('user', user)

      if (!user.suscriptions.includes(JSON.stringify(subscription))) {
        const suscriptions = user.suscriptions
        suscriptions.push(JSON.stringify(subscription))

        Users.update({ _id }, { $set: { suscriptions }}, (err, data) => {
          console.log(err)
          console.log(data)
        });
        return true
      }

      return true
    })
  },

  sendCancelNotification(CalendarId, msg) {
    Calendar.findById({ _id: CalendarId }).then(calendar => {

      const subscriptions = calendar.subscriptions
      subscriptions.map(user => {
        Users.findById({ _id: user }).then(datauser => {
          const payload = JSON.stringify({ title: msg });

          datauser.suscriptions.map(sub => {
            webpush
              .sendNotification(JSON.parse(sub), payload)
              .then(response => {
                console.log(response)
                console.log('Se mando una notificación')
                return true
              })
              .catch(err => {
                console.log(err)
                console.log('NO se mando una notificación')
                return false
              });
          })
        })
      })
    })
  },

  sendNotification(users, type, msg) {
    users.map(user => {
      const userId = user._id

      Users.findById({ _id: userId }).then(datauser => {
        const payload = JSON.stringify({ title: msg });

        datauser.suscriptions.map(sub => {
          webpush
            .sendNotification(JSON.parse(sub), payload)
            .then(response => {
              console.log(response)
              console.log('Se mando una notificación')
              return true
            })
            .catch(err => {
              console.log(err)
              console.log('NO se mando una notificación')
              return false
            });
        })
      })
    })
  }
};
