const env = process.env;

module.exports = {
  server: {
    host: env.APP_HOST,
    port: env.APP_PORT,
  },
  db: {
    host: env.APP_DB_HOST,
    port: env.APP_DB_PORT,
    databaseName: env.APP_DB_NAME,
    username: env.APP_DB_USERNAME,
    password: env.APP_DB_PASSWORD,
    log: 0,
  },
};
