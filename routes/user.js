const express = require('express');
const router = express.Router();
const hash = require('../config/hash');
const Sequelize = require('../models/index').sequelize;
const db = require('../models/index');
const passport = require('passport');
const User = require('../models').user;
const Oauth1 = require('../models').oauth1;
const Oauth2 = require('../models').oauth2;
const Platform = require('../models').platform;
const PlatformOauth = require('../models').platformoauth;

router.get('/profile', function(req, res, next) {
    return res.send(req.user);
});


router.post('/platform', validation, function(req, res, next) {
    Platform.find({where:{name:req.body.name}}).then(platform => {
        if (platform != null) {
            return res.status(400).json({
                'message':'duplicates not allowed, platform already exists'
            });
        }
        Platform.create(req.body.platform).then(platform => {
            if (req.body.platform.oauth_type == 'oauth1') {
                Oauth1.create(req.body.oauth1).then(oauth1 => {
                    PlatformOauth.create({
                        'platform_id': platform.id,
                        'oauth_id': oauth1.id,
                        'oauth_type':'oauth1'
                    }).then(platformaouth => {
                        return res.status(200).json({oauth1});
                    });
                });
            } else if (req.body.platform.oauth_type == 'oauth2') {
                Oauth2.create(req.body.oauth2).then(oauth2 => {
                    PlatformOauth.create({
                        'platform_id':platform.id,
                        'oauth_id':oauth2.id,
                        'oauth_type':'oauth2'
                    }).then(platformaouth => {
                        return res.status(200).json({oauth2});
                    });
                });
            } else {
                return res.status(400).json({ 
                    'error':'Sorry, oauth type not allowed' 
                });
            }
        });
    });
});

router.get('/platforms', function(req, res, next) {
    Platform.findAll().then(platforms => {
        res.status(200).send(platforms);
    });
});
router.get('/logout',  function(req, res) {
    req.logout();
    req.session.destroy(err=> {
        if(err) return err;
        res.redirect('/');
    });
});

module.exports = router;


function validation(req, res, next) {
    req.checkBody('platform.name', 'Please fill in name field').notEmpty();
    req.checkBody('platform.oauth_type', 'we do need an oauth_type for the platform').notEmpty();

    if (req.validationErrors()) 
        return res.status(400).send(req.validationErrors());

    if (req.body.platform.oauth_type == 'oauth1') {
        req.checkBody('oauth1.requestTokenURL', 'platform needs requestTokenURL').notEmpty();
        req.checkBody('oauth1.accessTokenURL', 'platform needs AccessTokenURL').notEmpty();
        req.checkBody('oauth1.userAuthorizationURL', 'platform needs userAuthorizationURL').notEmpty();
        req.checkBody('oauth1.consumerKey', 'platform needs consumerKey').notEmpty();
        req.checkBody('oauth1.consumerSecret', 'platform needs consumerSecret').notEmpty();
        req.checkBody('oauth1.callbackURL', 'platform needs callbackURL').notEmpty();

        if (req.validationErrors()) 
            return res.status(400).send(req.validationErrors());
    }
    if (req.body.platform.oauth_type == 'oauth2') {
        req.checkBody('oauth2.authorizationURL', 'platform needs authorizationURL').notEmpty();
        req.checkBody('oauth2.tokenURL', 'platform needs tokenURL').notEmpty();
        req.checkBody('oauth2.clientID', 'platform needs clientID').notEmpty();
        req.checkBody('oauth2.clientSecret', 'platform needs clientSecret').notEmpty();
        req.checkBody('oauth2.callbackURL', 'platform needs callbackURL').notEmpty();

        if (req.validationErrors()) 
            return res.status(400).send(req.validationErrors());
    }
    return next();
}
