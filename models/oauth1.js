'use strict';
module.exports = (sequelize, DataTypes) => {
    var oauth1 = sequelize.define('oauth1', {
        requestTokenURL: DataTypes.STRING,
        accessTokenURL: DataTypes.STRING,
        userAuthorizationURL: DataTypes.STRING,
        consumerKey: DataTypes.STRING,
        consumerSecret: DataTypes.STRING,
        callbackURL: DataTypes.STRING,
        signatureMethod: DataTypes.STRING
    }, {});

    oauth1.associate = function(models) {

    };

    return oauth1;
};
