var firebase = require("firebase");

var middleware = {};


middleware.isLoggedIn = function(req, res, next) {
    var user = firebase.auth().currentUser;
    if (user) {
        return next();
    }
    res.redirect("/login");
}

middleware.isAuthenticatedUser = function(req, res, next) {
    var uid = firebase.auth().currentUser.uid;
    if (res.originalUrl === "/register/" + uid) {
        return next();
    }
    res.redirect("/");
}

module.exports = middleware;
