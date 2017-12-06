const express = require("express"),
      app = express(),
      bodyParser = require("body-parser"),
      firebase = require("firebase"),
      passport = require('passport'),
      mongoose = require('mongoose'),
      LocalStrategy = require('passport-local');

const User = require("./models/user"),
      dbURL = process.env.DATABASEURL || "mongodb://localhost/talkit-out";

const indexRoutes = require("./routes");

mongoose.connect(dbURL);

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(require('express-session')({
    secret : 'PersonalizingSearch',
    resave : false,
    saveUninitialized : false
}));

app.use(express.static(__dirname + "/public")); // makes the folder available for communication to server and backend
app.use("/", indexRoutes);

const config = require("./services");
firebase.initializeApp(config);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

app.listen(3030, function() {
    console.log("Server Started");
});


