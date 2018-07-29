const Coachs = require('../models/Coachs');

module.exports = {
  create(coachsProps) {
    const coachs = new Coachs(coachsProps);
    return coachs.save();
  },

  delete(_id) {
    return Coachs.findByIdAndRemove({ _id });
  },

  edit(_id, coachsProps) {
    return Coachs.findByIdAndUpdate({ _id }, coachsProps);
  },

  find(_id) {
    return Coachs.findById(_id);
  },

  findAll() {
    return Coachs.find({ status: { $ne: 'DELETED' } });
  },
};
