var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    firebase = require("firebase");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

var config = require("./services"),
    indexRoutes = require("./routes");

firebase.initializeApp(config);



app.use("/", indexRoutes);

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server Started");
});
