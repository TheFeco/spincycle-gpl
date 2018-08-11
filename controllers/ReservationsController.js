/* eslint-disable */
const Reservations = require('../models/Reservations');

module.exports = {
  create(reservationsProps) {
    const reservations = new Reservations(reservationsProps);
    return reservations.save().then(res => Reservations.findById(res._id).exec());
  },
  delete(_id) {
    return Reservations.findByIdAndRemove({ _id }).exec();
  },
  edit(_id, reservationsProps) {
    return Reservations.findByIdAndUpdate({ _id }, reservationsProps).exec();
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
