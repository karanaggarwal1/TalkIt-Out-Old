var express = require("express"),
    router = express.Router(),
    firebase = require("firebase");

var middleware = require("../middleware");

router.get("/login", function(req, res) {
    var socVar;
    res.render("auth/login", { socVar: socVar, res: res });
});

router.post("/login", function(req, res) {
    var { emailAddress, password } = req.body.login;
    firebase.auth().signInWithEmailAndPassword(emailAddress, password).
    then(function(user) {
        res.render("landing.ejs");
    }).catch(function(error) {
        console.log(error);
        res.redirect("/login");

    });
});

router.get("/register", function(req, res) {
    res.render("auth/register");
});

router.post("/register", function(req, res) {
    var { emailAddress, password, firstName, lastName } = req.body.register;
    firebase.auth().createUserWithEmailAndPassword(emailAddress, password).then((user) => {
        user.updateProfile({
            displayName: firstName + " " + lastName
        }).then(function() {
            firebase.auth().signInWithEmailAndPassword(emailAddress, password).then((user) => {
                res.redirect("/register/" + user.uid);
            })
        }, function(error) {
            console.log(error);
        });
    }).catch((error) => {
        console.log(error);
    });
});

router.get("/", function(req, res) {
    res.render("landing");
});


router.get("/register/:id", [middleware.isLoggedIn, middleware.isAuthenticatedUser], function(req, res) {
    res.render("users/preferences", { user: firebase.auth().currentUser });
});

router.post("/register/:id", [middleware.isLoggedIn, middleware.isAuthenticatedUser], function(req, res) {
    res.render("users/preferences", { user: firebase.auth().currentUser });
});

module.exports = router;
