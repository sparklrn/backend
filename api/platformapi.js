const faker = require('faker');
const models = require('../models');
const db = require('../models/index');
const Platform = require('../models').platform;

const platforms = ['udemy', 'khan', 'udacity', 'free code camp', 'codecademy', 'edx'];

platforms.forEach(function(platform) {
    console.log(platform);
    Platform.create({
        title:platform
    });
});
