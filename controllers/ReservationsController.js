/* eslint-disable */
const Reservations = require('../models/Reservations');
const CalendarController = require('./CalendarController');

module.exports = {
  create(reservationsProps, calendarId) {
    const reservations = new Reservations(reservationsProps);
    reservations.save().then(res => {
      Reservations.findById(res._id).exec().then(data => {
        CalendarController.find(calendarId).then(dataCalendar => {
          var reservations = dataCalendar.reservations
          reservations.push(data._id)
          return CalendarController.edit(calendarId, { reservations })
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
        return CalendarController.edit(calendarId, { reservations: reservationsList })
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
