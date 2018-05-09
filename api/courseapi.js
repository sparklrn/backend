const faker = require('faker');
const models = require('../models');
const db = require('../models/index');
const Platform = require('../models').platform;
const Course = require('../models').course;

Platform.findAll().then(platforms => {
    platforms.forEach(function(platform){
        for(var i = 0; i <=12; i++) {
            Course.create({
                title: faker.random.word(),
                platformId: platform.id
            });
        }
    });
});

