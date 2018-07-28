const Schedules = require('../models/Schedules');

module.exports = {
  create(chedulesProps) {
    const schedules = new Schedules(chedulesProps);
    return schedules.save();
  },

  delete(_id) {
    return Schedules.findByIdAndRemove({ _id });
  },

  edit(_id, schedulesProps) {
    return Schedules.findByIdAndUpdate({ _id }, schedulesProps);
  },

  find(_id) {
    return Schedules.findById(_id);
  },

  findAll() {
    return Schedules.find({});
  },
};
