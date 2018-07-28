'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    id: { primaryKey: true, type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING
  },{
    name: {
      singular: 'user',
      plural: 'users'
    }
  });
  User.associate = function(models){
    User.hasMany(models.Account, {foreignKey: 'userId'} );
    User.hasMany(models.Category, {foreignKey: 'userId'} );
    User.hasMany(models.Movement, {foreignKey: 'userId'} );
  }
  return User;
};