'use strict';
module.exports = (sequelize, DataTypes) => {
    var user = sequelize.define('user', {
        email: DataTypes.STRING,
        password: DataTypes.STRING
    }, {});

    user.associate = function(models) {

    };

    user.prototype.toJSON = function() {
        var values = Object.assign({}, this.get());
        delete values.password;
        return values;
    }

    return user;
};
