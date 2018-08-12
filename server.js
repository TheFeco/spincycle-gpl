require('./config/config');
// Express
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { execute, subscribe } = require('graphql');
const cors = require('cors');
const { createServer } = require('http');
// Mongose CONFIG
/* eslint-disable */
const { mongoose } = require('./db/mongoose');
/* eslint-enable */

// GraphQL
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { SubscriptionServer } = require('subscriptions-transport-ws');
// Cache
const DataLoader = require('dataloader');

const schema = require('./schema');

const app = express();
const port = process.env.PORT;
const wsport = process.env.WSPORT;


app.use(cors(), bodyParser.json());

app.use(
  '/graphql',
  graphqlExpress(req => ({
    schema,
  }))
);

app.use('/graphiql',  graphiqlExpress({
    endpointURL: '/graphql',
    subscriptionsEndpoint: `ws://localhost:${port}/subscriptions`
  })
);

const ws = createServer(app);
ws.listen(port, () => {
  console.log(`Go to http://localhost:${port}/graphql to run queries!`);

  new SubscriptionServer({
    execute,
    subscribe,
    schema
  }, {
    server: ws,
    path: '/subscriptions',
  });
});

/*
app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});
*/

module.exports = {
  app
};
