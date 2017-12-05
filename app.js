var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    firebase = require("firebase");

var middleware = require("./middleware");
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public")); // makes the folder available for communication to server and backend

var config = require("./services"),
    indexRoutes = require("./routes");

firebase.initializeApp(config);

app.use("/", indexRoutes);

app.listen(3030, function() {
    console.log("Server Started");
});


