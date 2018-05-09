const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const OAuth1Strategy = require('passport-oauth').OAuthStrategy;
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

}

