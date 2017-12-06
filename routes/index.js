const express = require("express"),
      router = express.Router(),
      firebase = require("firebase"),
      passport = require("passport");

const User = require("../models/user");

var middleware = require("../middleware");

var strategies = require("./data/schemes");

router.get("/login", function(req, res) {
    res.render("auth/login");
});

router.post("/login", function(req, res) {
    var { emailAddress, password } = req.body.login;

});

router.get("/register", function(req, res) {
    res.render("auth/register");
});

router.post("/register", function(req, res) {
    let { emailAddress, password, firstName, lastName } = req.body.register;
    let newUser = new User({
        username : emailAddress,
        firstName : firstName,
        lastName : lastName
    });
    User.register(newUser, password , function(err, user){
        if(err){
           console.log(err);
           return res.redirect('/register');
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/");
        });
    });
});

router.get("/", function(req, res) {
    res.render("landing");
});


router.get("/register/:id", [middleware.isLoggedIn, middleware.isAuthenticatedUser], function(req, res) {
    res.render("users/preferences", { users: firebase.auth().currentUser });
});

router.post("/register/:id", [middleware.isLoggedIn, middleware.isAuthenticatedUser], function(req, res) {
    res.render("users/preferences", { user: firebase.auth().currentUser });
});
/*
    1. Check if user exists
        a. If exists then log him in
        b. If doesn't exist then redirect to register page
            i. Before redirecting, add him to the user database
*/
router.get("/checkUser", function(req, res) {
    switch (req.query.method) {
        case 'facebook':

            break;
        case 'github':

            break;
        case 'google':

            break;
        default:

    }
});

module.exports = router;
