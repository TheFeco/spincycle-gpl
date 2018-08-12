/* eslint-disable */
const SchedulesBoughts = require('../models/SchedulesBoughts');

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
      .populate('user')
      .populate('plan')
      .exec();
  },
  findAllByPlan(planID) {
    return SchedulesBoughts.find({ plan: planID, status: { $ne: 'DELETED' } })
      .populate('user')
      .populate('plan')
      .exec();
  },
};
