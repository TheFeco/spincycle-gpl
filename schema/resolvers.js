const SchedulesControler = require('./../controllers/SchedulesControler');
const PlansControler = require('./../controllers/PlansControler');
const CoachsControler = require('./../controllers/CoachsControler');
const UsersControler = require('./../controllers/UsersControler');
const CalendarControler = require('./../controllers/CalendarController');
const SchedulesBoughtsContoler = require('./../controllers/SchedulesBoughtsController');
const NotificationsController = require('./../controllers/NotificationsController');
const ReservationsController = require('./../controllers/ReservationsController');

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
    },
    /** Calendar */
    allCalendars: () => {
      return CalendarControler.findAll();
    },
    allCalendarBySchedules: (_, { schedulesId }) => {
      return CalendarControler.findAllBySchedules(schedulesId);
    },
    allCalendarByCoachs: (_, { coachsID }) => {
      return CalendarControler.findAllByCoachs(coachsID);
    },
    findAllSchedulesByWeek: (_, { initialDate, finishDate }) => {
      return CalendarControler.findAllSchedulesByWeek(initialDate, finishDate);
    },
    /** SchedulesBoughts */
    allSchedulesBoughts: () => {
      return SchedulesBoughtsContoler.findAll();
    },
    allSchedulesBoughtsByUser: (_, { userId }) => {
      return SchedulesBoughtsContoler.findAllByUser(userId);
    },
    allSchedulesBoughtsByPlan: (_, { planID }) => {
      return SchedulesBoughtsContoler.findAllByPlan(planID);
    },
    /** Notifications */
    allNotifications: () => {
      return NotificationsController.findAll();
    },
    allNotificationsByUser: (_, { userId }) => {
      return NotificationsController.findAllByUser(userId);
    },
    /** Reservations */
    allReservations: () => {
      return ReservationsController.findAll();
    },
    allReservationsByUser: (_, { userId }) => {
      return ReservationsController.findAllByUser(userId);
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
    /** Calendar */
    addCalendar: (_, { data }) => {
      return CalendarControler.create(data);
    },
    modifyCalendar: (_, { data, id }) => {
      return CalendarControler.edit(id, data);
    },
    createWeek: (_, { data }) => {
      return CalendarControler.createWeek(data);
    },
    /** SchedulesBoughts */
    addSchedulesBoughts: (_, { data }) => {
      return SchedulesBoughtsContoler.create(data);
    },
    modifySchedulesBoughts: (_, { data, id }) => {
      return SchedulesBoughtsContoler.edit(id, data);
    },
    /** Notifications */
    addNotification: (_, { data }) => {
      return NotificationsController.create(data);
    },
    modifyNotification: (_, { data, id }) => {
      return NotificationsController.edit(id, data);
    },
    /** Reservations */
    addReservation: (_, { data, calendarId }) => {
      return ReservationsController.create(data, calendarId);
    },
    modifyReservation: (_, { data, id, calendarId, reservationsList }) => {
      return ReservationsController.edit(id, data, calendarId, reservationsList);
    }
  },
  Reservations: {
    user: (reservations) => {
      return UsersControler.find(reservations.user);
    }
  },
  Calendar: {
    reservations: (calendar) => {
      return calendar.reservations.map(reservation => ReservationsController.find(reservation))
    },
    schedule: (calendar) => {
      return SchedulesControler.find(calendar.schedule)
    }
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
    }
  }
};
