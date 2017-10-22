var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");
    
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/",function(req,res){
   res.render("landing"); 
});

app.get("/login",function(req,res){
    res.render("auth/login");
});

app.get("/register", function(req,res){
    res.render("auth/register");
});

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Server Started");
});
