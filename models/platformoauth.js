'use strict';
module.exports = (sequelize, DataTypes) => {
    var platformoauth = sequelize.define('platformoauth', {
        platform_id: DataTypes.INTEGER,
        oauth_id: DataTypes.INTEGER,
        oauth_type: DataTypes.STRING
    }, {});

    platformoauth.associate = function(models) {

    };

    return platformoauth;
};
