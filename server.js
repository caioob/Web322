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
var multer = require("multer");

var port = process.env.PORT || 8080;

//Starting message
function onHttpStart(){
    console.log("Express http server listening on port " +port);
}

//multer setup
const storage = multer.diskStorage({
    destination: "./public/images/uploaded",
    filename: function (req, file, cb){
        cb(null, Date.now()+path.extname(file.originalname));
    }
});

//creating upload variable
const upload = multer({ storage: storage });

//setting up css
app.use(express.static("public"));

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

//emplyees/add route
app.get("/employees/add", function(req,res){
    res.sendFile(path.join(__dirname, "/views/addEmployee.html"));
});

//Images/add route
app.get("/images/add", function(req,res){
    res.sendFile(path.join(__dirname, "/views/addImage.html"));
});

//Images post route
app.post("/images/add", upload.single("photo"), function(req, res){
    res.redirect("/images");
});

//managers route
app.get("/managers", function (req, res){
    data.getManagers()
    .then((data) => {res.json(data)})
    .catch((err) => {res.json(err)})
});
//departments route
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