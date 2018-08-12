const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers');

const typeDefs = `
  scalar Date

  type Query {
    allSchedules: [Schedules]
    schedulesByDay(day: String): [Schedules]

    allPlans: [Plans]

    allCoachs: [Coachs]

    allUsers: [Users]
    login(credentials: CredentialsInput): UserJWT!

    allCalendars: [Calendar]
    allCalendarBySchedules(schedulesId: ID!): [Calendar]
    allCalendarByCoachs(coachsID: ID!): [Calendar]
    findAllSchedulesByWeek(initialDate: Date, finishDate: Date): [Calendar]

    allSchedulesBoughts: [SchedulesBoughts]
    allSchedulesBoughtsByUser(userId: ID!): [SchedulesBoughts]
    allSchedulesBoughtsByPlan(planID: ID!): [SchedulesBoughts]

    allNotifications: [Notifications]
    allNotificationsByUser(userId: ID!): [Notifications]

    allReservations: [Reservations]
    allReservationsByUser(userId: ID!): [Reservations]
  }

  type Schedules {
    id: ID
    day: String,
    order: String,
    hour: String,
    status: String,
    created: Date
  }

  type Plans {
    id: ID
    name: String,
    price: Float,
    class: Int,
    status: String,
    created: Date
  }

  type Coachs {
    id: ID
    name: String,
    gender: String,
    review: String,
    photo: String,
    status: String,
    created: Date
  }

  type Users {
    id: ID
    user: String,
    name: String,
    lastName: String,
    phone: String,
    type: String,
    suscriptions: [String],
    password: String,
    status: String,
    created: Date
  }

  type Calendar {
    id: ID
    isOpen: Boolean,
    dateOfCalendar: Date
    schedule: Schedules,
    coach: Coachs,
    reservations: [Reservations],
    status: String,
    created: Date
  }

  type SchedulesBoughts {
    id: ID
    date: Date,
    prince: Float,
    quantity: Int,
    availables: Int,
    user: Users,
    plan: Plans,
    status: String,
    created: Date
  }

  type Notifications {
    id: ID,
    message: String,
    title: String,
    user: Users,
    type: String,
    status: String,
    created: Date
  }

  type Reservations {
    id: ID,
    day: Date,
    canceledDate: Date,
    user: Users,
    bike: Int,
    status: String,
    created: Date
  }

  type UserJWT {
    id: ID
    name: String
    password: String
    type: String
    jwt: String
  }

  input SchedulesInput {
    _id: ID,
    day: String,
    order: String,
    hour: String,
    status: String,
    created: Date
  }

 input PlansInput {
    _id: ID,
    name: String,
    price: Float,
    class: Int,
    status: String,
    created: Date
 }

  input CoachsInput {
    _id: ID
    name: String,
    gender: String,
    review: String,
    photo: String,
    status: String,
    created: Date
  }

  input UsersInput {
    _id: ID
    user: String,
    name: String,
    lastName: String,
    phone: String,
    type: String,
    suscriptions: [String]
    password: String,
    status: String,
    created: Date
  }

  input CredentialsInput {
    user: String!
    password: String!
  }

  input CalendarInput {
    _id: ID
    name: String,
    isOpen: Boolean,
    schedule: SchedulesInput,
    coach: CoachsInput,
    reservations: [ReservationsInput],
    status: String,
    created: Date
  }

  input SchedulesBoughtsInput {
    _id: ID
    date: Date,
    prince: Float,
    quantity: Int,
    availables: Int,
    user: UsersInput,
    plan: PlansInput,
    status: String,
    created: Date
  }

  input NotificationsInput {
    _id: ID,
    message: String,
    title: String,
    user: UsersInput,
    type: String,
    status: String,
    created: Date
  }

  input ReservationsInput {
    _id: ID,
    day: Date,
    canceledDate: Date,
    user: UsersInput,
    bike: Int,
    status: String,
    created: Date
  }

  input objectsOfDates {
    day: String
    date: Date
  }

 type Mutation {
    addSchedules(data: SchedulesInput): Schedules
    modifySchedules(data: SchedulesInput, id: ID!): Schedules

    addPlans(data: PlansInput): Plans
    modifyPlans(data: PlansInput, id: ID!): Plans

    addCoachs(data: CoachsInput): Coachs
    modifyCoachs(data: CoachsInput, id: ID!): Coachs

    addUsers(data: UsersInput): Users
    modifyUsers(data: UsersInput, id: ID!): Users

    addCalendar(data: CalendarInput): Calendar
    modifyCalendar(data: CalendarInput, id: ID!): Calendar
    createWeek(data: [objectsOfDates]): Boolean

    addSchedulesBoughts(data: SchedulesBoughtsInput): SchedulesBoughts
    modifySchedulesBoughts(data: SchedulesBoughtsInput, id: ID!): SchedulesBoughts

    addNotification(data: NotificationsInput): Notifications
    modifyNotification(data: NotificationsInput, id: ID!): Notifications

    addReservation(data: ReservationsInput, calendarId: ID!): Calendar
    modifyReservation(id: ID!, data: ReservationsInput, calendarId: ID!, reservationsList: [ReservationsInput]): Notifications
 }
`;

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers
});
