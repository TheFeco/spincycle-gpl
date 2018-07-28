const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers');

const typeDefs = `
scalar Date
 
type Query {
    allSchedules: [Schedules]
 }

 type Schedules {
  id: ID
  day: String,
  order: String,
  hour: String,
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

 type Mutation {
    addSchedules(data: SchedulesInput): Schedules
    modifySchedules(data: SchedulesInput, id: ID!): Schedules
 }
`;

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers
});
