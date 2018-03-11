import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';

import config from '../../../config';

const databaseName = config.db.databaseName;

const sequelize = new Sequelize(
  databaseName,
  config.db.username,
  config.db.password,
  {
    host: config.db.host,
    port: config.db.port,
    dialect: 'postgres',
    logging: config.db.log,
  },
);

const db = {};

fs
  .readdirSync(__dirname)
  .filter(file =>
    (file.indexOf('.') !== 0) && (file !== 'index.js') && file.lastIndexOf('.js') === (file.length - 3),
  )
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
