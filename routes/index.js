var express = require("express"),
    router = express.Router(),
    firebase = require("firebase");

router.get("/login", function(req, res) {
    res.render("auth/login");
});

router.post("/login", function(req, res) {
    var { emailAddress, password } = req.body.login;
    firebase.auth().signInWithEmailAndPassword(emailAddress, password).
    then(function(user) {
        res.render("landing.ejs");
    }).catch(function(error) {
        console.log(error);
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
                res.redirect("/");
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

module.exports = router;
