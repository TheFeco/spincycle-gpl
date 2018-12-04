require('./config/config');
// Express
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { execute, subscribe } = require('graphql');
const cors = require('cors');
const { createServer } = require('http');
const webpush = require('web-push');
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
const userController = require('./controllers/UsersControler');

const app = express();
const port = process.env.PORT;
const wsport = process.env.WSPORT;

const privateVapidKey = "690kdtSdqNZ-zm5McmCCoIIqoTib_6fCj54i0SC1l8s"
const publicVapidKey = "BM_rRLyqVP60tMstFQFpy1zDpRSTdBODR2cnd3VgFux9HtyvTeoPgIGXmZYrnZzzM5b_WunyX-DpM635ULzJHxw"

webpush.setVapidDetails(
  "mailto:luisbenitezpd@gmail.com",
  publicVapidKey,
  privateVapidKey
);

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

app.post('/api/subscription', (req, res) => {
  const response = userController.saveSuscription(req.body.userId, req.body.subscription)
  res.status(200).json({ created: response })
})

app.post('/api/send-notification', (req, res) => {
  if (req.body.type === 'cancel') {
    const response = userController.sendCancelNotification(req.body.calendarId, req.body.message)
    res.status(200).json({ created: response })
  }
  else {
    const { users, type, message } = req.body
    const response = userController.sendNotification(users, type, message)
    res.status(200).json({ created: response })
  }
})

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
