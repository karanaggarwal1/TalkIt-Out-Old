var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    firebase = require("firebase");

var middleware = require("./middleware"),
    config = require("./services"),
    indexRoutes = require("./routes");

firebase.initializeApp(config);

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use("/", indexRoutes);

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server Started");
});
