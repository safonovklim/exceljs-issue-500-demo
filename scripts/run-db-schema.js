import createSchema from './db-schema.js';

createSchema()
  .then(() => process.exit(0));
