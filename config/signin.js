module.exports = (name, res, req) => {
    return res.redirect(name || req.session.returnTo);
    delete req.session.returnTo;
}
