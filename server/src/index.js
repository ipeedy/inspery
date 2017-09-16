/* eslint-disable no-console */

import express from 'express';
import { createServer } from 'http';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';
import notifier from 'node-notifier';

import './config/db';
import constants from './config/constants';
import middlewares from './config/middlewares';
import typeDefs from './graphql/schema';
import resolvers from './graphql/resolvers';
// import mocks from './mocks';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const app = express();

middlewares(app);

app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: constants.GRAPHQL_PATH,
    subscriptionsEndpoint: `ws://localhost:${constants.PORT}${constants.SUBSCRIPTIONS_PATH}`,
  }),
);
app.use(
  constants.GRAPHQL_PATH,
  graphqlExpress(req => ({
    schema,
    context: {
      user: req.user,
    },
  })),
);

const graphQLServer = createServer(app);

// mocks().then(() => {
graphQLServer.listen(constants.PORT, err => {
  if (err) {
    notifier.notify({
      title: 'Inspery API',
      message: '🦑 Service failed to start!',
    });
    console.error(err);
  } else {
    new SubscriptionServer(
      {
        // eslint-disable-line
        schema,
        execute,
        subscribe,
      },
      {
        server: graphQLServer,
        path: constants.SUBSCRIPTIONS_PATH,
      },
    );

    notifier.notify({
      title: 'Inspery API',
      message: '👨‍❤️‍💋‍👨 Service started!',
    });
    console.log(`App listen to port: ${constants.PORT} 🐠`);
  }
});
// });
