var express = require('express');
var passport = require('passport');
var signin = require('../config/signin');
var router = express.Router();
var User = require('../models').user;
var hash = require('../config/hash');
var Platform = require('../models').platform;
var Course = require('../models').course;
var jwt = require('jsonwebtoken');
var Sequelize = require('../models/index').sequelize;
var db = require('../models/index');

router.post('/login', function(req, res, next) {
    passport.authenticate('login',{session: false},  (err, user) => {
        if (err) {
            return res.status(500).json({
                message:'An error occurred in the serve',
                error: err.message
            });
        }

        if (!user) {
            return res.status(400).json({
                message: 'Sorry, Please recheck your username and password'
            });
        }

        req.login(user, {session: false}, (err) => {
            if(err) {
                return res.status(500).json({
                    'message': 'sorry, something is not right',
                    'error':err.message
                });
            }

            const token = jwt.sign(user.toJSON(), 'my_long_token_secret');
            return res.json({user, token});
        });
    })(req, res, next);
});

router.post('/signup', function(req, res, next) {
    req.checkBody('password', 'fill in password field').notEmpty();
    req.checkBody('email', 'fill in username field').notEmpty();
    req.checkBody('password_confirmation', 'Passwords are not equal').equals(req.body.password);

    if(req.validationErrors())
        return res.status(400).send(req.validationErrors());

    User.find({where:{email:req.body.email}}).then(user => {
        if(user!=null)
            return res.status(400).json({
                'error':'email already in use, try out something else'
            });

        req.body.password = hash(req.body.password);
        User.create(req.body).then(user => {
            req.login(user, {session: false}, (err) => {
                if(err) return res.status(500).json({
                    'message': 'server error, call systsm admin',
                    'error':err.message
                });
                const token = jwt.sign(user.toJSON(), 'my_long_token_secret');
                return res.json({user, token});
            });
        });
    });
});

module.exports = router;
