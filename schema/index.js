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
    name: String,
    lastName: String,
    phone: String,
    type: String,
    user: String,
    password: String,
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
    id: ID
    name: String,
    lastName: String,
    phone: String,
    type: String,
    user: String,
    password: String,
    status: String,
    created: Date
  }

  input CredentialsInput {
    user: String!
    password: String!
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
 }
`;

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers
});
