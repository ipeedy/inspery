/* eslint-disable no-console */

import express from 'express';
import { createServer } from 'http';
import notifier from 'node-notifier';

import './config/db';
import constants from './config/constants';
import middlewares from './config/middlewares';
// import mocks from './mocks';

const app = express();

middlewares(app);

const graphQLServer = createServer(app);

// mocks().then(() => {
  graphQLServer.listen(constants.PORT, err => {
    if (err) {
      notifier.notify({
        'title': 'Inspery API',
        'message': '🦑 Service failed to start!',
      });
      console.error(err);
    } else {
      notifier.notify({
        'title': 'Inspery API',
        'message': '👨‍❤️‍💋‍👨 Service started!',
      });
      console.log(`App listen to port: ${constants.PORT} 🐠`);
    }
  });
// });
