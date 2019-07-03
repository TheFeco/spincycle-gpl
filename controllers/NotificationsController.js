/* eslint-disable */
const Notifications = require('../models/Notifications');

module.exports = {
  create(notificationsProps) {
    const notifications = new Notifications(notificationsProps);
    return notifications.save()
      .then(res => Notifications.findById(res._id)
        .populate('user')
        .exec());
  },
  delete(_id) {
    return Notifications.findByIdAndRemove({ _id })
      .populate('user')
      .exec();
  },
  edit(_id, notificationsProps) {
    return Notifications.findByIdAndUpdate({ _id }, notificationsProps)
      .populate('user')
      .exec();
  },
  find(_id) {
    return Notifications.findById(_id)
      .populate('user')
      .exec();
  },
  findAll() {
    return Notifications.find({ status: { $ne: 'DELETED' } })
      .populate('user')
      .sort({ created: 'desc' })
      .exec();
  },
  findAllBySchedules(userId) {
    return Notifications.find({ user: userId, status: { $ne: 'DELETED' } })
      .populate('user')
      .exec();
  },
};
