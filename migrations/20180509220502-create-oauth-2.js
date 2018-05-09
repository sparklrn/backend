'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('oauth2s', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      authorizationURL: {
        type: Sequelize.STRING
      },
      tokenURL: {
        type: Sequelize.STRING
      },
      clientID: {
        type: Sequelize.STRING
      },
      clientSecret: {
        type: Sequelize.STRING
      },
      callbackURL: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('oauth2s');
  }
};