const Plans = require('../models/Plans');

module.exports = {
  create(plansProps) {
    const plans = new Plans(plansProps);
    return plans.save();
  },

  delete(_id) {
    return Plans.findByIdAndRemove({ _id });
  },

  edit(_id, plansProps) {
    return Plans.findByIdAndUpdate({ _id }, plansProps);
  },

  find(_id) {
    return Plans.findById(_id);
  },

  findAll() {
    return Plans.find({ status: { $ne: 'DELETED' } });
  },
};
