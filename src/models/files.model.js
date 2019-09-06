// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const files = sequelizeClient.define('files', {
    filename: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      comments: '文件名'
    },
    data: {
      type: DataTypes.BLOB('large'),
      allowNull: false,
      comments: '文件数据'
    },
    size: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    mimeType: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comments: '文件类型'
    },
    description: {
      type: DataTypes.STRING(2000),
      allowNull: true,
      comments: '文件描述'
    },
    isPrivate: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comments: '是否隐藏'
    },
    accessCount: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: 0,
      comments: '访问计数'
    },
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  files.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    // 文件创建者
    // files.belongsTo(models.users, {as: 'creator', foreignKey: 'createdBy'});
    // 文件编辑者
    // files.belongsTo(models.users, {as: 'updater', foreignKey: 'updatedBy'});
  };

  return files;
};
