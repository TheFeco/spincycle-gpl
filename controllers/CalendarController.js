/* eslint-disable */
const Calendar = require('../models/Calendar');
const SchedulesControler = require('./SchedulesControler');
const moment = require('moment')

module.exports = {
  create(calendarProps) {
    const calendar = new Calendar(calendarProps);
    return calendar.save().then(res =>
      Calendar.findById(res._id)
        .populate('schedule')
        .populate('coach')
        .populate('reservations')
        .populate('user')
        .exec()
    );
  },
  delete(_id) {
    return Calendar.findByIdAndRemove({ _id })
      .populate('schedule')
      .populate('coach')
      .populate('reservations')
      .populate('user')
      .exec();
  },
  edit(_id, calendarProps) {
    return Calendar.findByIdAndUpdate({ _id }, calendarProps)
      .populate('schedule')
      .populate('coach')
      .populate('reservations')
      .populate('user')
      .exec();
  },
  find(_id) {
    return Calendar.findById(_id)
      .populate('schedule')
      .populate('coach')
      .populate('reservations')
      .populate('user')
      .exec();
  },
  findAll() {
    return Calendar.find({ status: { $ne: 'DELETED' } })
      .populate('schedule')
      .populate('coach')
      .populate('reservations')
      .populate('reservations.user')
      .exec();
  },
  findAllBySchedules(schedulesId) {
    return Calendar.find({ schedules: schedulesId, status: { $ne: 'DELETED' } })
      .populate('schedule')
      .populate('coach')
      .populate('reservations')
      .populate('user')
      .exec();
  },
  findAllBySchedulesAndDate(schedulesId, date) {
    return Calendar.findOne({
      schedule: schedulesId,
      dateOfCalendar: date,
      status: { $ne: 'DELETED' }
    })
    .exec()
    .then(schedule => (schedule ? true : false));
  },
  findAllByCalendarId(calendarId) {
    return Calendar.findOne({ _id: calendarId })
    .exec();
  },
  findAllByCoachs(coachsID) {
    return Calendar.find({ coach: coachsID, status: { $ne: 'DELETED' } })
      .populate('schedule')
      .populate('coach')
      .populate('reservations')
      .populate('user')
      .exec();
  },
  findAllById(calendarId) {
    return Calendar.findOne({ _id: calendarId })
      .exec();
  },
  findAllReservations(reservationsID) {
    return Calendar.find({ reservations: reservationsID, status: { $ne: 'DELETED' } })
      .populate('schedule')
      .populate('coach')
      .populate('reservations')
      .populate('user')
      .exec();
  },
  createWeek(objectsOfDates) {
    const defaultObject = {
      dateOfCalendar: '',
      schedule: {
        _id: ''
      }
    }

    objectsOfDates.forEach(date => {
      const day = date.day;
      const lastDate = moment(date.date).subtract(7, 'days')

      SchedulesControler.findByDay(day)
        .then(schedules => {
          schedules.forEach(schedule => {
            Calendar.findOne({ schedule: schedule._id, dateOfCalendar: lastDate }, (error, calendar) => {
              this.findAllBySchedulesAndDate(schedule.id, date.date).then(existingSchedule => {
                if (!existingSchedule) {
                  defaultObject.coach = { _id: calendar.coach }
                  defaultObject.dateOfCalendar = date.date
                  defaultObject.schedule._id = schedule.id
                  this.create(defaultObject)
                }
              });
            })
          });
        })
        .catch(() => false);
    });

    return true;
  },
  findAllSchedulesByWeek(initialDate, finishDate) {
    return Calendar.find({
      dateOfCalendar: { $gte: initialDate, $lte: finishDate }
    })
      .populate('schedule')
      .populate('coach')
      .populate('reservations')
      .populate('user')
      .sort('dateOfCalendar')
      .exec();
  }
};
