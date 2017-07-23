/* eslint-disable no-console */

import express from 'express';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import bodyParser from 'body-parser';
import { createServer } from 'http';
import notifier from 'node-notifier';

import './config/db';
import constants from './config/constants';
import typeDefs from './graphql/schema';
import resolvers from './graphql/resolvers';
import mocks from './mocks';

const app = express();

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

app.use(bodyParser.json());

app.use('/graphiql', graphiqlExpress({
  endpointURL: constants.GRAPHQL_PATH
}));

app.use(constants.GRAPHQL_PATH, graphqlExpress({
  schema
}));

const graphQLServer = createServer(app);

mocks().then(() => {
  graphQLServer.listen(constants.PORT, err => {
    if (err) {
      notifier.notify({
        'title': 'Twitter Clone',
        'message': '🦑 Service failed to start!',
      });
      console.error(err);
    } else {
      notifier.notify({
        'title': 'Twitter Clone',
        'message': '🐠 Service started!',
      });
      console.log(`App listen to port: ${constants.PORT} 🐠`);
    }
  });
});
