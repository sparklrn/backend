'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('oauth1s', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      requestTokenURL: {
        type: Sequelize.STRING
      },
      accessTokenURL: {
        type: Sequelize.STRING
      },
      userAuthorizationURL: {
        type: Sequelize.STRING
      },
      consumerKey: {
        type: Sequelize.STRING
      },
      consumerSecret: {
        type: Sequelize.STRING
      },
      callbackURL: {
        type: Sequelize.STRING
      },
      signatureMethod: {
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
    return queryInterface.dropTable('oauth1s');
  }
};