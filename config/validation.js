module.exports =  (req, res, next) => {
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
