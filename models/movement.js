'use strict';
module.exports = (sequelize, DataTypes) => {
  var Movement = sequelize.define('Movement', {
    userId: DataTypes.INTEGER,
    movementDate: DataTypes.DATE,
    accountFrom: DataTypes.INTEGER,
    categoryId: DataTypes.UUID,
    title: DataTypes.STRING,
    value: DataTypes.DECIMAL,
    movementType: DataTypes.ENUM('Receita','Despesa','Transferencia'),
    description: DataTypes.TEXT('tiny')
  },{
    name: {
      singular: 'movement',
      plural: 'movements'
    }
  });
  Movement.associate = function(models){
    Movement.belongsTo(models.User, { foreignKey: 'userId' });
    Movement.belongsTo(models.Account, { foreignKey: 'accountFrom' });
    Movement.belongsTo(models.Category, { foreignKey: 'categoryId' });
  };
  return Movement;
};