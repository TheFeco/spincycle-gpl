/* eslint-disable */
const Reservations = require('../models/Reservations');

module.exports = {
  create(reservationsProps) {
    const reservations = new Reservations(reservationsProps);
    return reservations.save()
      .then(res => Reservations.findById(res._id)
        .populate('user')
        .exec());
  },
  delete(_id) {
    return Reservations.findByIdAndRemove({ _id })
      .populate('user')
      .exec();
  },
  edit(_id, reservationsProps) {
    return Reservations.findByIdAndUpdate({ _id }, reservationsProps)
      .populate('user')
      .exec();
  },
  find(_id) {
    return Reservations.findById(_id)
      .populate('user')
      .exec();
  },
  findAll() {
    return Reservations.find({ status: { $ne: 'DELETED' } })
      .populate('user')
      .exec();
  },
  findAllBySchedules(userId) {
    return Reservations.find({ user: userId, status: { $ne: 'DELETED' } })
      .populate('user')
      .exec();
  },
};
