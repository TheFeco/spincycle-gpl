const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers');

const typeDefs = `
  scalar Date
 
  type Query {
    allSchedules: [Schedules]
    schedulesByDay(day: String): [Schedules]

    allPlans: [Plans]

    allCoachs: [Coachs]
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

 type Mutation {
    addSchedules(data: SchedulesInput): Schedules
    modifySchedules(data: SchedulesInput, id: ID!): Schedules
    
    addPlans(data: PlansInput): Plans
    modifyPlans(data: PlansInput, id: ID!): Plans
    
    addCoachs(data: CoachsInput): Coachs
    modifyCoachs(data: CoachsInput, id: ID!): Coachs
 }
`;

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers
});
