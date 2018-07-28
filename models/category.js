'use strict';
module.exports = (sequelize, DataTypes) => {
  var Category = sequelize.define('Category', {
    id: {primaryKey: true, type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4},
    userId: DataTypes.UUID,
    description: DataTypes.STRING
  },{
    name: {
      singular: 'category',
      plural: 'categories'
    }
  });
  Category.associate = function(models){
    Category.belongsTo(models.User, { foreignKey: 'userId' });
  }
  return Category;
};