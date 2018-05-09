const faker = require('faker');
const models = require('../models');
const db = require('../models/index');
const User = require('../models').user;
const hash = require('../config/hash');

const users = ['brian@gmail.com', 'joseph@gmail.com', 'sese@gmail.com', 'racheal@gmail.com', 'juliet@gmail.com'];
const password = hash('pass');

users.forEach(function(user) {
    User.create({
        email: user,
        password: password
    });
});
