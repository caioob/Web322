/*********************************************************************************
*  WEB322 –Assignment 04
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
const express = require("express");
const path = require("path");
const app = express();
const data = require("./data-service.js");
const multer = require("multer");
const fs = require("fs");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const dataServiceAuth = require("./data-service-auth.js");
const clientSessions = require("client-sessions");

//ensure login declaration
function ensureLogin(req, res, next) {
    if (!req.session.user) {
      res.redirect("/login");
    } else {
      next();
    }
  }

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


//handlebars setup
app.engine('.hbs', exphbs({ 
    extname: '.hbs',
    defaultLayout: 'main',
    helpers: {
        navLink: function(url, options){
            return '<li' + 
            ((url == app.locals.activeRoute) ? ' class="active" ' : '') + 
            '><a href="' + url + '">' + options.fn(this) + '</a></li>';
        },
        equal: function (lvalue, rvalue, options) {
            if (arguments.length < 3)
            throw new Error("Handlebars Helper equal needs 2 parameters");
            if (lvalue != rvalue) {
                return options.inverse(this);
            } else {
                return options.fn(this);
            }
        }
    }
}));
app.set('view engine', '.hbs');

//setting up middleware
app.use(function(req,res,next){
    let route = req.baseUrl + req.path;
    app.locals.activeRoute = (route == "/") ? "/" : route.replace(/\/$/, "");
    next();
});

//using body-parser
app.use(bodyParser.urlencoded({ extended: true }));

//setting up css
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.static(path.join(__dirname, "/public/css")));

//Client-Sessions setup
app.use(clientSessions({
    cookieName: "session",
    secret: "senhalongadaweb322secreta",
    duration: 2 * 60* 1000,
    activeDuration: 1000 * 60
}));

//seeting up the session object
app.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
});


//setting up home 
app.get("/", (req, res) => {
    res.render('home');
});

//setting up about
app.get("/about", (req, res) => {
    res.render('about');
});

//employees route
app.get("/employees", ensureLogin,(req, res) => {
    if(req.query.status){
        data.getEmployeesByStatus(req.query.status)
        .then((data) => {
            if(data.length > 0){res.render("employees", {data: data})}
            else{res.render("employees", {message: "No results"})}
        })
        .catch((err) => res.render({message: "no results"}))
    }
    else if(req.query.department){
        data.getEmployeesByDepartment(req.query.department)
        .then((data) => {
            if(data.length > 0){res.render("employees", {data: data})}
            else{res.render("employees", {message: "No results"})}
        })
        .catch((err) => res.render({message: "no results"}))
        
    }
    else if(req.query.manager){
        data.getEmployeesByManager(req.query.manager)
        .then((data) => {
            if(data.length > 0){res.render("employees", {data: data})}
            else{res.render("employees", {message: "No results"})}
        })
        .catch((err) => res.render({message: "no results"})) 
    }
    else {
        data.getAllEmployees()
        .then((data) => {
            if(data.length > 0){res.render("employees", {data: data})}
            else{res.render("employees", {message: "No results"})}
        })
        .catch((err) => res.render({message: "no results"}))
    }
    
});

//employee/:num route
app.get("/employee/:empNum", ensureLogin, (req, res) => {

    // initialize an empty object to store the values
    let viewData = {};

    data.getEmployeeByNum(req.params.empNum).then((data) => {
        if (data) {
            viewData.employee = data; //store employee data in the "viewData" object as "employee"
        } else {
            viewData.employee = null; // set employee to null if none were returned
        }
    }).catch(() => {
        viewData.employee = null; // set employee to null if there was an error 
    }).then(data.getDepartments)
    .then((data) => {
        viewData.departments = data; // store department data in the "viewData" object as "departments"

        // loop through viewData.departments and once we have found the departmentId that matches
        // the employee's "department" value, add a "selected" property to the matching 
        // viewData.departments object

        for (let i = 0; i < viewData.departments.length; i++) {
            if (viewData.departments[i].departmentId == viewData.employee.department) {
                viewData.departments[i].selected = true;
            }
        }

    }).catch(() => {
        viewData.departments = []; // set departments to empty if there was an error
    }).then(() => {
        if (viewData.employee == null) { // if no employee - return an error
            res.status(404).send("Employee Not Found");
        } else {
            res.render("employee", { viewData: viewData }); // render the "employee" view
        }
    });
});

// /employees/delete/:empNum route
app.get("/employees/delete/:empNum", ensureLogin, (req, res) => {
    data.deleteEmployeeByNum(req.params.empNum)
    .then(() =>{res.redirect("/employees")})
    .catch(() => {res.status(500).send("Unable to Remove Employee / Employee not found")})
});

// /employee/update route
app.post("/employee/update", ensureLogin, (req, res) => {
    console.log(req.body);
    data.updateEmployee(req.body)
    .then(() =>res.redirect("/employees"))
    .catch((err)=>{res.status(500).send("Unable to Update Employee");});
});

//employees/add route
app.get("/employees/add", (req, res) => { 
    data.getDepartments() 
    .then((dat)=>res.render("addEmployee",{departments:dat})) 
    .catch(()=>res.render("addEmployee",{departments:[]}))  
}); 

//employees/add post route
app.post("/employees/add", ensureLogin, upload.single("photo"),(req, res) => { 
    data.addEmployee(req.body)
    .then(() => {res.redirect("/employees")})
    .catch(() => {req.send("Employee creation failed.")})
});

//Images get route 
app.get("/images", ensureLogin, (req,res) => {
    var here = path.join(__dirname, "public/images/uploaded");
    fs.readdir(here, (err, files) => {
        res.render("images",{ 
            data: files});
    });
});

//Images/add route
app.get("/images/add", ensureLogin, (req,res) => {
    res.render('addImage');
});

//Images post route
app.post("/images/add", ensureLogin, upload.single("imageFile"), (req,  res) => {
    res.redirect("/images");
});

//departments route
app.get("/departments", ensureLogin, (req, res) => {
    data.getDepartments()
    .then((data) => {
        if(data.length>0){ res.render("departments", {data: data});}
        else{ res.render("departments", {message: "No results"});}
    })
    .catch((err) => res.json(err))  
});

// /departments/add route
app.get("/departments/add", ensureLogin, (req,res) =>{
    res.render("addDepartment");
});

// /departments/add post route
app.post("/departments/add", ensureLogin, (req,res) =>{
    data.addDepartment(req.body)
    .then(() => res.redirect("/departments"))
    .catch(() => req.send("Department creation failed."))
});

// /department/update route
app.post("/department/update", ensureLogin, (req, res) => {
    console.log(req.body);
    data.updateDepartment(req.body)
    .then(() => {res.redirect("/departments")})
})

// /department/:departmentId route
app.get("/department/:departmentId", ensureLogin, (req, res) =>{
    data.getDepartmentById(req.params.departmentId)
    .then((dat) => {res.render("department", { data: dat })})
    .catch((err) => {res.status(404).sendFile(path.join(__dirname, "/views/404.html"))})
});

// /login get route
app.get("/login", (req, res) => {
    res.render("login");
});

// /login post route
app.post("/login", (req, res) => {
    req.body.userAgent = req.get('User-Agent');
    dataServiceAuth.checkUser(req.body)
    .then((user) => {
        req.session.user = {
            userName: user.userName,
            email: user.email,
            loginHistory: user.loginHistory
        }
        res.redirect("/employees");    
    })
    .catch((err) => {res.render("login", {errorMessage: err, userName: req.body.userName})})
});

// /register get route
app.get("/register", (req, res) => {
    res.render("register");
});

// /register post route
app.post("/register", (req, res) => {
    dataServiceAuth.RegisterUser(req.body)
    .then(() => {res.render("register", {successMessage: "User created"})})
    .catch((err) => {res.render("register", {errorMessage: err, userName: req.body.userName})})
});

// /logout get route
app.get("/logout", (req, res) => {
    req.session.reset();
    res.redirect("/login");
});

// /userHistory get route
app.get ("/userHistory", ensureLogin, (req,res) => {
    res.render("userHistory", {user: req.session.user});
})


//Error Satuts Page (Error 404)
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, "/views/404.html"));
});

data.initialize()
.then(dataServiceAuth.Initialize())
.then((data) => {
    app.listen(port, onHttpStart)
    console.log(data);
})
.catch((err) => {console.log(err)})