/* eslint-disable */
const Reservations = require('../models/Reservations');
const Calendar = require('../models/Calendar');
const Users = require('../models/Users');
const CalendarController = require('./CalendarController');
const SchedulesBoughtsController = require('./SchedulesBoughtsController');

module.exports = {
  create(reservationsProps, calendarId) {
    const reservations = new Reservations(reservationsProps);
    reservations.save().then(res => {
      Reservations.findById(res._id).exec().then(data => {
        CalendarController.find(calendarId).then(dataCalendar => {
          SchedulesBoughtsController.findAllByUser(reservationsProps.user._id).then(boughts => {
            const withAvailables = boughts.filter(bought => bought.availables > 0)
            if (withAvailables.length > 0) {
              const availables = withAvailables[0].availables - 1
              SchedulesBoughtsController.edit(withAvailables[0]._id, { availables })

              var reservations = dataCalendar.reservations
              reservations.push(data._id)
              return CalendarController.edit(calendarId, { reservations })
            }
          })
        })
      })
    });
  },
  delete(_id) {
    return Reservations.findByIdAndRemove({ _id }).exec();
  },
  edit(_id, reservationsProps, calendarId, reservationsList) {
    Reservations.findByIdAndUpdate({ _id }, reservationsProps).exec().then(data => {
      CalendarController.find(calendarId).then(dataCalendar => {
        SchedulesBoughtsController.findAllByUser(data.user).then(boughts => {
          if (boughts.length > 0) {
            const availables = boughts[boughts.length - 1].availables + 1
            SchedulesBoughtsController.edit(boughts[boughts.length - 1]._id, { availables })
          }
          
          return CalendarController.edit(calendarId, { reservations: reservationsList })
        })
      })
    })
  },
  find(_id) {
    return Reservations.findById(_id).exec();
  },
  findAll() {
    return Calendar.find({ status: { $ne: 'DELETED' }, dateOfCalendar: { $gte: new Date() }}).exec()
  },
  findAllByCalendar() {
    Calendar.find({ status: { $ne: 'DELETED' }, dateOfCalendar: { $gte: new Date() }})
    .populate('reservations')
    .populate('users')
    .exec()
  },
  findAllByUser(userId) {
    return Reservations.find({ user: userId, status: { $ne: 'DELETED' } }).exec();
  }
};
