/* eslint-disable no-console */
import bootstrap from './db-data.js';
import { proceedError } from './errors';

bootstrap()
  .then(() => {
    console.log('Bootstrap finished');
  })
  .catch(err => proceedError(err))
  .then(() => process.exit(0));
/* eslint-enable no-console */
