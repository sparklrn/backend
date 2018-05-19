const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const OAuthStrategy = require('passport-oauth').OAuthStrategy;
const OAuth2Strategy = require('passport-oauth').OAuth2Strategy;
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const User = require('../models').user;
const bCrypt = require('bcrypt');
const hash = require('./hash');

module.exports = (passport)=>{

    passport.use('login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    (req, email, password, done) => {
        User.findOne({where:{'email':email}}).then(user=>{
            if(user == null)
                return done(null, false, 'user does not exist');

            bCrypt.compare(password, user.password, (err, isMatch)=>{
                if(err) throw(err);

                if(isMatch)
                    return done(null,user);
                else
                    return done(null, false, "wrong username and password combination")
            });
        });
    }));

    passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'my_long_token_secret',
    },
    (jwtPayload, done)=> {
        User.findById(jwtPayload.id).then(user => {
            if(user != null)
                return done(null, user);
            else
                return done(null, false);
        }).catch(err => {
            return done(err);
        });;
    }));

    passport.use('provider', new OAuthStrategy({
        requestTokenURL: 'https://www.provider.com/oauth/request_token',
        accessTokenURL: 'https://www.provider.com/oauth/access_token',
        userAuthorizationURL: 'https://www.provider.com/oauth/authorize',
        consumerKey: 'CONSUMER_KEY',
        consumerSecret: 'CONSUMER_SECRET',
        callbackURL: 'https://www.example.com/auth/provider/callback'
    },
    (token, tokenSecret, profile, done) => {
        User.findOrCreate(user, (err, done) => {
            done(err, user);
        });
    }));

    passport.use('provider2', new OAuth2Strategy({
        authorizationURL: 'https://www.provider.com/oauth2/authorize',
        tokenURL: 'https://www.provider.com/oauth2/token',
        clientID: 'client_id',
        clientSecret: 'client_secret',
        callbackURL: 'https://www.example.com/auth/provider/callback'
    },
    (accessToken, refreshToken, profile, done) => {
        User.findOrCreate(user, (err, done) => {
            done(err, user);
        });
    }));
}
