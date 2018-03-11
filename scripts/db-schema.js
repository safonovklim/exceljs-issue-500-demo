/* eslint-disable no-console */
import models from '../server/db/postgres';

import { proceedError } from './errors';

export default function createSchema() {
  return Promise
    .resolve()
    .then(() => models.sequelize.drop())
    .then(
      () => models.sequelize.sync({
        force: true,
      })
        .then(() => console.log('Schema creation finished'))
        .catch(err => proceedError(err, 'Cannot create schema')),
    );
}
/* eslint-enable no-console */
