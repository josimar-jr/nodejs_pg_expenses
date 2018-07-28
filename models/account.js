'use strict';

//const User = require('./user.js')(sequelize, Sequelize);

module.exports = (sequelize, DataTypes) => {
  var Account = sequelize.define('Account', {
    id: {primaryKey: true, type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4},
    account: DataTypes.STRING
  },{
    name: {
      singular: 'account',
      plural: 'accounts'
    }
  });
  Account.associate = function(models){
    Account.belongsTo(models.User, { foreignKey: 'userId' })
  }
  return Account;
};