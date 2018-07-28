'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Movements', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.UUID
      },
      movementDate: {
        allowNull: false,
        type: Sequelize.DATE,
        default: Sequelize.NOW
      },
      accountFrom: {
        allowNull: false,
        type: Sequelize.UUID
      },
      categoryId: {
        allowNull: false,
        type: Sequelize.UUID
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      value: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      movementType: {
        allowNull: false,
        type: Sequelize.ENUM('Receita','Despesa','Trasferencia')
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        default: Sequelize.NOW
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    }).then( ()  => 
      queryInterface.addConstraint('Movements', ['userId'], {
      type: 'foreign key',
      references: { //Required field
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
      })
    ).then( ()  => 
      queryInterface.addConstraint('Movements', ['accountFrom'], {
      type: 'foreign key',
      references: { //Required field
        table: 'Accounts',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
      })
    ).then( ()  => 
      queryInterface.addConstraint('Movements', ['categoryId'], {
      type: 'foreign key',
      references: { //Required field
        table: 'Categories',
        field: 'id'
      },
      onUpdate: 'cascade'
      })
    ).then( () =>
        queryInterface.addIndex('Movements',['userId', 'movementDate'])
    ).then( () =>
        queryInterface.addIndex('Movements',['userId', 'accountFrom'])
    ).then( () =>
        queryInterface.addIndex('Movements',['userId', 'categoryId'])
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Movements');
  }
};