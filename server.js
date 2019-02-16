/*********************************************************************************
*  WEB322 –Assignment 02
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part 
*  of this 
assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: Caio Leonardo Bueno Basaglia Student ID: 152593174 Date: 31/1/2019
*
*  Online (Heroku) Link: https://immense-taiga-37263.herokuapp.com/
*
********************************************************************************/ 
//dependencies declaration
var express = require("express");
var path = require("path");
var app = express();
var data = require("./data-service.js");
var multer = require("multer");
var fs = require("fs");
var bodyParser = require("body-parser");

//port definition
var port = process.env.PORT || 8080;

//Starting message
function onHttpStart(){
    console.log("Express http server listening on port " +port);
}

//multer setup
const storage = multer.diskStorage({
    destination: "./public/images/uploaded",
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

//creating upload variable
const upload = multer({storage: storage});

//using body-parser
app.use(bodyParser.urlencoded({ extended: true }));

//setting up css
app.use(express.static(path.join(__dirname, "/public/css")));

//setting up home 
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/home.html"));
});

//setting up about
app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/about.html"));
});

//employees route
app.get("/employees", (req, res) => {
    if(req.query.status){
        data.getEmployeesByStatus(req.query.status)
        .then((data) => res.json(data))
        .catch((err) => res.json({"message": err})) 
    }
    else if(req.query.departments){
        data.getEmployeesByDepartment(req.query.departments)
        .then((data) => res.json(data))
        .catch((err) => res.json({"message": err})) 
        
    }
    else if(req.query.manager){
        data.getEmployeesByManager(req.query.manager)
        .then((data) => res.json(data))
        .catch((err) => res.json({"message": err})) 
    }
    else {
        data.getAllEmployees()
        .then((data) => res.json(data))
        .catch((err) => res.json(err))
    }
    
});

//employees/status route
/*app.get("/employees/value", (req, res) => {
    data.getEmployeesByNum(data)
    .then((data) => res.json(data))
    .catch((err) => res.json(err))
});*/

//employees/add route
app.get("/employees/add", (req,res) => {
    res.sendFile(path.join(__dirname, "/views/addEmployee.html"));
});

//employees/add post route
app.post("/employees/add", upload.single("photo"),(req, res) => { 
    const  employeeData = req.body;
    data.addEmployee(employeeData)
    .then(() => res.redirect("/employees"))
    .catch(() => req.send("Employee creation failed."))
});

//Images get route 
app.get("/images", (req,res) => {
    var here = path.join(__dirname, "/public/images/uploaded");
    fs.readdir(here, (err, files) => {
        res.send({images: files});
    });
});

//Images/add route
app.get("/images/add", (req,res) => {
    res.sendFile(path.join(__dirname, "/views/addImage.html"));
});

//Images post route
app.post("/images/add", upload.single("imageFile"), (req,  res) => {
    res.redirect("/images");
});

//managers route
app.get("/managers",  (req, res) => { 
    data.getManagers()
    .then((data) => {res.json(data)})
    .catch((err) => {res.json(err)})
});

//departments route
app.get("/departments", (req, res) => {
    data.getDepartments()
    .then((data) => {res.json(data)})
    .catch((err) => {res.json(err)})
});


//Error Satuts Page (Error 404)
app.use((req, res) => {
    //res.status(404).send("<h1 style='color: red;'>Error 404. Page Not Found</h1>");
    res.status(404).sendFile(path.join(__dirname, "/views/404.html"));
});

data.initialize()
.then((data) => {
    app.listen(port, onHttpStart)
    console.log(data);
})
.catch((err) => {console.log(err)})