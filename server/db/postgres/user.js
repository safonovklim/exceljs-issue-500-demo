module.exports = (sequelize, DataTypes) => {
  return sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      field: 'first_name',
    },
    middleName: {
      type: DataTypes.STRING,
      field: 'middle_name',
    },
    lastName: {
      type: DataTypes.STRING,
      field: 'last_name',
    },
    email: {
      type: DataTypes.STRING,
      field: 'email',
    },
  }, {
    freezeTableName: true,
    tableName: 'users',
  });
};

