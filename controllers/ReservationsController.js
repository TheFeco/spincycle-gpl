/* eslint-disable */
const Reservations = require('../models/Reservations');
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
          const availables = boughts[0].availables + 1
          SchedulesBoughtsController.edit(boughts[0]._id, { availables })
          return CalendarController.edit(calendarId, { reservations: reservationsList })
        })
      })
    })
  },
  find(_id) {
    return Reservations.findById(_id).exec();
  },
  findAll() {
    return Reservations.find({ status: { $ne: 'DELETED' } }).exec();
  },
  findAllBySchedules(userId) {
    return Reservations.find({ user: userId, status: { $ne: 'DELETED' } }).exec();
  }
};
