import { Client } from 'pg';
import config from '../../config';

const client = new Client({
  user: config.db.username,
  host: config.db.host,
  database: config.db.databaseName,
  password: config.db.password,
  port: config.db.port,
});
client.connect();
client
  .on('error', (err) => {
    console.log(err); // eslint-disable-line
    client.connect();
  });

module.exports = client;
