const SchedulesControler = require('./../controllers/SchedulesControler');
const PlansControler = require('./../controllers/PlansControler');
const CoachsControler = require('./../controllers/CoachsControler');
const UsersControler = require('./../controllers/UsersControler');

module.exports = {
  Query: {
    /** Schedules */
    allSchedules: () => {
      return SchedulesControler.findAll();
    },
    schedulesByDay: (_, { day }) => {
      return SchedulesControler.findByDay(day);
    },
    /** Plans */
    allPlans: () => {
      return PlansControler.findAll();
    },
    /** Coachs */
    allCoachs: () => {
      return CoachsControler.findAll();
    },
    /** Users */
    login: (_, { credentials }) => {
      return UsersControler.login(credentials);
    },
    allUsers: () => {
      return UsersControler.findAll();
    }
  },
  Mutation: {
    /** Schedules */
    addSchedules: (_, { data }) => {
      return SchedulesControler.create(data);
    },
    modifySchedules: (_, { data, id }) => {
      return SchedulesControler.edit(id, data);
    },
    /** Plans */
    addPlans: (_, { data }) => {
      return PlansControler.create(data);
    },
    modifyPlans: (_, { data, id }) => {
      return PlansControler.edit(id, data);
    },
    /** Coachs */
    addCoachs: (_, { data }) => {
      return CoachsControler.create(data);
    },
    modifyCoachs: (_, { data, id }) => {
      return CoachsControler.edit(id, data);
    },
    /** Users */
    addUsers: (_, { data }) => {
      return UsersControler.create(data);
    },
    modifyUsers: (_, { data, id }) => {
      return UsersControler.edit(id, data);
    },
  },
  /* This code saves the scalar type os Date found in this thred
  https://github.com/graphql/graphql-js/issues/497
  Convers mongo Date to GraphQL timeStamp */
  Date: {
    __parseValue(value) {
      return new Date(value); // value from the client
    },
    __serialize(value) {
      return value.getTime(); // value sent to the client
    },
    __parseLiteral(ast) {
      /* eslint-disable */
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10); // ast value is always in string format
      }
      /* eslint-enable */
      return null;
    },
  },
};
