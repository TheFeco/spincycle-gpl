/* eslint-disable */
const SchedulesBoughts = require('../models/SchedulesBoughts');
const Plans = require('../models/Plans');
const moment = require('moment')

module.exports = {
  create(SchedulesBoughtsProps) {
    const schedulesBoughts = new SchedulesBoughts(SchedulesBoughtsProps);
    return schedulesBoughts.save()
      .then(res => SchedulesBoughts.findById(res._id)
        .populate('user')
        .populate('plan')
        .exec());
  },
  delete(_id) {
    return SchedulesBoughts.findByIdAndRemove({ _id })
      .populate('user')
      .populate('plan')
      .exec();
  },
  edit(_id, SchedulesBoughtsProps) {
    return SchedulesBoughts.findByIdAndUpdate({ _id }, SchedulesBoughtsProps)
      .populate('user')
      .populate('plan')
      .exec();
  },
  find(_id) {
    return SchedulesBoughts.findById(_id)
      .populate('user')
      .populate('plan')
      .exec();
  },
  findAll() {
    return SchedulesBoughts.find({ status: { $ne: 'DELETED' } })
      .populate('user')
      .populate('plan')
      .sort({ date: 'desc' })
      .exec();
  },
  findAllByUser(userId) {
    return SchedulesBoughts.find({ user: userId, status: { $ne: 'DELETED' }})
    .populate('plans')
    .populate('users')
    .exec()
  },
  findAllByPlan(planID) {
    return SchedulesBoughts.find({ plan: planID, status: { $ne: 'DELETED' } })
      .populate('users')
      .populate('plans')
      .exec();
  },

  checkDifferences(userId){
    SchedulesBoughts.find({ user: userId, status: { $ne: 'DELETED' }, availables: { $gt : 0 }}, (err, bougths) => {
      bougths.map(async (item)=> {
        if (item.availables > 0) {
          const planData = await Plans.findById({ _id: item.plan })
          const days = planData.expiration
          const created = moment(item.date).format('YYYY-MM-DD')
          const diff = moment().diff(created, 'days')

          if (diff > days) {
            SchedulesBoughts.update({ _id: item._id }, { $set: { availables: 0 }}, (err, data) => console.log(data))
          }
        }
      })
    })
  }
}
