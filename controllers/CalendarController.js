/* eslint-disable */
const Calendar = require('../models/Calendar');
const SchedulesControler = require('./SchedulesControler');

module.exports = {
  create(calendarProps) {
    const calendar = new Calendar(calendarProps);
    return calendar.save().then(res =>
      Calendar.findById(res._id)
        .populate('schedule')
        .populate('coach')
        .exec()
    );
  },
  delete(_id) {
    return Calendar.findByIdAndRemove({ _id })
      .populate('schedule')
      .populate('coach')
      .exec();
  },
  edit(_id, calendarProps) {
    return Calendar.findByIdAndUpdate({ _id }, calendarProps)
      .populate('schedule')
      .populate('coach')
      .exec();
  },
  find(_id) {
    return Calendar.findById(_id)
      .populate('schedule')
      .populate('coach')
      .exec();
  },
  findAll() {
    return Calendar.find({ status: { $ne: 'DELETED' } })
      .populate('schedule')
      .populate('coach')
      .exec();
  },
  findAllBySchedules(schedulesId) {
    return Calendar.find({ schedules: schedulesId, status: { $ne: 'DELETED' } })
      .populate('schedule')
      .populate('coach')
      .exec();
  },
  findAllByCoachs(coachsID) {
    return Calendar.find({ Vehicle: coachsID, status: { $ne: 'DELETED' } })
      .populate('schedule')
      .populate('coach')
      .exec();
  },
  createWeek(objectsOfDates) {
    const defaultObject = {
      dateOfCalendar: '',
      schedule: {
        _id: ''
      }
    };

    objectsOfDates.forEach(date => {
      const day = date.day;
      SchedulesControler.findByDay(day)
        .then(schedules => {
          schedules.forEach(schedule => {
            defaultObject.dateOfCalendar = date.date;
            defaultObject.schedule._id = schedule.id;
            this.create(defaultObject);
          });
        })
        .catch(() => false);
    });

    return true;
  }
};
