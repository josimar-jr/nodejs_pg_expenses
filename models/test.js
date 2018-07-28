'use strict';
module.exports = (sequelize, DataTypes) => {
  var Test = sequelize.define('Test', {
    desc: DataTypes.STRING,
    numb: DataTypes.INTEGER
  }, {});
  Test.associate = function(models) {
    // associations can be defined here
  };
  return Test;
};