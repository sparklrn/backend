const faker = require('faker');
const models = require('../models');
const db = require('../models/index');
const User = require('../models').user;
const Course = require('../models').course;
const hash = require('../config/hash');
const UserCourse = require('../models').usercourse;

const users = ['brian@gmail.com', 'joseph@gmail.com', 'sese@gmail.com', 'racheal@gmail.com', 'juliet@gmail.com'];

UserCourse.destroy({where:{}});
Course.findAll().then(courses => {
    User.findAll().then(users=>{
        users.forEach(user=> {
            courses.forEach(course=>{
                console.log(user);
                UserCourse.create({
                    userId: user.id,
                    courseId: course.id
                });
            });
        });
    });
});
