'use strict';
module.exports = (sequelize, DataTypes) => {
    var platform = sequelize.define('platform', {
        name: {
            type: DataTypes.STRING,
            unique: true,
        },
        major: DataTypes.STRING,
        oauth_type: {
            type: DataTypes.ENUM,
            values: ['oauth1', 'oauth2']
        }
    }, {});

    platform.associate = function(models) {

    };

    return platform;
};
//major is what the different platforms offer mostly
