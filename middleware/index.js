var firebase = require("firebase");

var middleware = {};


middleware.isLoggedIn = function(req, res, next) {
    var user = firebase.auth().currentUser;
    if (user) {
        return next();
    }
    res.redirect("/login");
}

module.exports = middleware;
