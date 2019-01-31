/*********************************************************************************
*  WEB322 –Assignment 02
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part 
*  of this 
assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: Caio Leonardo Bueno Basaglia Student ID: 152593174 Date: 31/1/2019
*
*  Online (Heroku) Link: https://evening-badlands-51858.herokuapp.com/
*
********************************************************************************/ 

var express = require("express");
var path = require("path");
var app = express();
var data = require("./data-service.js");

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
    data.getAllEmployees()
    .then((data) => {res.json(data)})
    .catch((err) => {res.json(err)})
});

app.get("/managers", function (req, res){
    data.getManagers()
    .then((data) => {res.json(data)})
    .catch((err) => {res.json(err)})
});

app.get("/departments", function (req, res){
    data.getDepartments()
    .then((data) => {res.json(data)})
    .catch((err) => {res.json(err)})
});

//Error Satuts Page (Error 404)
app.use(function(req, res){
    res.status(404).send("<h1 style='color: red;'>Error 404. Page Not Found</h1>");
});

data.initialize()
.then(() => {app.listen(port, onHttpStart)})
.catch(() => {console.log("No results returned")})