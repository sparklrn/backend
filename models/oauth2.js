'use strict';
module.exports = (sequelize, DataTypes) => {
    var oauth2 = sequelize.define('oauth2', {
        authorizationURL: DataTypes.STRING,
        tokenURL: DataTypes.STRING,
        clientID: DataTypes.STRING,
        clientSecret: DataTypes.STRING,
        callbackURL: DataTypes.STRING
    }, {});

    oauth2.associate = function(models) {

    };

    return oauth2;
};
