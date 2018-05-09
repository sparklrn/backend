const express = require('express');
const router = express.Router();
const hash = require('../config/hash');
const Sequelize = require('../models/index').sequelize;
const db = require('../models/index');
const passport = require('passport');
const User = require('../models').user;

router.get('/profile', function(req, res, next) {
    return res.send(req.user);
});

router.post('/platform', function(req, res, next) {
    req.checkBody('name', 'Please fill in name field').notEmpty();
    req.checkBody('oauth_type', 'we do need an oauth_type for the platform').notEmpty();

    if (req.validationErrors()) 
        return res.status(400).send(req.validationErrors());

    /**
     * Platform Fields for Request Body
     * platform {name, major, oauth_type}
     * if (platform->oauth_type == oauth1)
     *      oauth1 {requestTokenURL, accessTokenURL, userAuthorizationURL, consumerKey, consumerSecret, callbackURL)
     * else if (platform->oauth_type == oauth2) 
     *      oauth2 {authorizationURL, tokenURL, clientID, clientSecret, callbackURL}
     */
    Platform.find({where:{name:req.body.name}}).then(platform => {
        if (platform != null) {
            return res.status(400).json({
                'message':'duplicates not allowed, platform already exists'
            });
        }
        var formdata = req.body;
        Platform.create(req.body.platform).then(platform => {
            if (req.body.platform.oauth_type == 'oauth1') {
                Oauth1.create(req.body.oauth1).then(oauth1 => {
                    PlatformOauth.create({
                        'platform_id': platform.id,
                        'oauth_id': oauth1.id,
                        'oauth_type':'oauth1'
                    }).then(platformaouth => {
                        return res.status(200).json({ouath1});
                    });
                });
            } else if (req.body.oauth_type == 'oauth2') {
                Oauth2.create(req.body.oauth2).then(oauth2 => {
                    PlatformOauth.create({
                        'platform_id':platform.id,
                        'oauth_id':oauth2.id,
                        'oauth_type':'oauth2'
                    }).then(platformaouth => {
                        return res.status(200).json({ouath2});
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
router.get('/logout',  function(req, res) {
    req.logout();
    req.session.destroy(err=> {
        if(err) return err;
        res.redirect('/');
    });
});

module.exports = router;
