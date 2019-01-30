var express = require("express");
var path = require("path");
var app = express();
var db = require("./data-service.js");

var port = process.env.PORT || 8080;

//Starting message
function onHttpStart(){
    console.log("Express http server listening on port " +port);
}

//setting up css
app.use(express.static('public'));

//setting up home 
app.get("/", function (req, res){
    res.sendFile(path.join(__dirname, "/views/home.html"));
});

//setting up about
app.get("/about", function (req, res){
    res.sendFile(path.join(__dirname, "/views/about.html"));
});

//employees route
app.get("/employees", function (req, res){

});

app.get("/managers", function (req, res){

});

app.get("/departments", function (req, res){

});

//Error Satuts Page (Error 404)
app.use(function(req, res){
    res.status(404).send("<h1 style='color: red;'>Error 404. Page Not Found</h1>");
});

app.listen(port, onHttpStart);
