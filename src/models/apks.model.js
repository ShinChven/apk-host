// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const apks = sequelizeClient.define('apks', {
    appId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    versionCode: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    versionName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    size: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    whatsNew: {
      type: DataTypes.STRING(2000),
      allowNull: true,
    },
    androidManifest: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    path: {
      type: DataTypes.STRING(2000),
      allowNull: false,
    },
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  apks.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return apks;
};
