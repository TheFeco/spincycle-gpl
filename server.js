require('./config/config');
// Express
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
// Mongose CONFIG
/* eslint-disable */
const { mongoose } = require('./db/mongoose');
/* eslint-enable */

// GraphQL
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
// Cache
const DataLoader = require('dataloader');

const schema = require('./schema');

const app = express();
const port = process.env.PORT;


app.use(cors(), bodyParser.json());

app.use(
  '/graphql',
  graphqlExpress(req => ({
    schema,
  }))
);

app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql'
  })
);

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {
  app
};
