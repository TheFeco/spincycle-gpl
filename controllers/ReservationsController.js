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


    return Calendar.find({ status: { $ne: 'DELETED' }, dateOfCalendar: { $gte: new Date() }}).exec()
      // .populate('reservations')
      // .populate('user')
      // .exec()
      // .then(response => {
      //   var reservations = []
      //   const _ = response.map((data) => {
      //     console.log(data.reservations)
      //     return [...reservations, ...data.reservations]
      //   })
      //
      //   console.log(reservations)
      // })
    // return Reservations.find({ status: { $ne: 'DELETED' }, day: { $gte: new Date() }}).sort({ day: 'desc' }).exec();
  },
  findAllByCalendar() {
    Calendar.find({ status: { $ne: 'DELETED' }, dateOfCalendar: { $gte: new Date() }})
    .populate('reservations')
    .exec()

    // , (error, data) => {
    //   Reservations.populate(data, { path: 'reservations', select: { '_id': 1, 'day': 1, 'user': 1, 'bike': 1 }}, (error, data) => {
    //     Users.populate(data, { path: 'reservations.user', select: { '_id':1, 'name':1 }}, (error, data) => {
    //
    //       var array = []
    //       const reservations = data.map(item => {
    //         return item.reservations.map(reservation => {
    //           array.push(reservation)
    //           return
    //         })
    //       })
    //
    //       return { data: array }
    //     })
    //   })
    // })
  },
  findAllByUser(userId) {
    return Reservations.find({ user: userId, status: { $ne: 'DELETED' } }).exec();
  }
};
