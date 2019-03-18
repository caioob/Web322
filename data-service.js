// var employees = [];
// var departments = [];
var fs = require("fs");
const Sequelize = require("sequelize");

var sequelize = new Sequelize('database', 'user', 'password', {
    host: 'ec2-23-23-241-119.compute-1.amazonaws.com',
    dialect: 'd3tto6imqmthhr',
    port: 5432,
    dialectOptions: {
    ssl: true
    }
    });

var Employee = sequelize.define("Employee", {
    employeeNum: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstname: Sequelize.STRING,
    lastName: Sequelize.STRING,
    email: Sequelize.STRING,
    SSN: Sequelize.STRING,
    addressCity: Sequelize.STRING,
    addressState: Sequelize.STRING,
    addressPostal: Sequelize.STRING,
    addressStatus: Sequelize.STRING,
    isManager: Sequelize.BOOLEAN,
    employeeManagerNum: Sequelize.INTEGER,
    status: Sequelize.STRING,
    department: Sequelize.INTEGER,
    hireDate: Sequelize.STRING
});

var Department = sequelize.define("Department",{
    departmentId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    departmentName: Sequelize.STRING
});

//this function opens the json files
module.exports.initialize = function(){
    return new Promise(function (resolve, reject){
        sequelize.sync() 
        .then(() =>{
            resolve("Database read completed successfully");
        })
        .catch(() =>{
            reject("File read failed");
        })
    });ß
    //     try{
    //         fs.readFile("./data/departments.json", (err, data) =>{
    //             if (err) {reject(err);}
    //             departments = JSON.parse(data);
    //         });
    //         fs.readFile("./data/employees.json", (err, data) =>{
    //             if (err) {reject(err);}
    //             employees = JSON.parse(data);
    //         });
    //         resolve("File read completed successfully");
    //     }
    //     catch{
    //        reject("File read failed");
    //     }
    // reject();
}


//this function sends the employees array
module.exports.getAllEmployees = function (){
    return new Promise(function (resolve, reject){
        Employee.findAll()
        .then(() => {resolve(Employee)})
        .catch(() => {reject("No results returned")})
    });
    //     if(employees.length == 0) {reject("No results returned");}
    //     resolve(employees);
    // reject();
}

//this function returns the employees who are managers
module.exports.getManagers = function(){
    
    // return new Promise(function (resolve, reject){
    //     var managers = [];
    //     if(employees.length == 0) {reject("No results returned");}
    //     for(var i = 0; i < employees.length; i++){
    //         if(employees[i].isManager == true) {managers.push(employees[i]);}
    //     }
    //     resolve(managers);
    // });
    reject();
}

//this function returns the departments array
module.exports.getDepartments = function(){
    // return new Promise(function (resolve, reject){
    //     if(departments.length == 0) {reject("No results returned");}
    //     resolve(departments);
    // });
    reject();
}

//addEmployees function
module.exports.addEmployee = function(employeeData){
    // return new Promise((resolve, reject) =>{
    //     if(employeeData.isManager == "on"){employeeData.isManager = true;}
    //     else{employeeData.isManager = false;}
    //     employeeData.employeeNum = employees.length + 1;
    //     employees.push(employeeData);
    //     resolve(employees);

    // });
    reject();
}

//getEmployeesByStatus function
module.exports.getEmployeesByStatus = (status) => {
    return new Promise((resolve, reject) => {
        Employee.findAll({
            where: {
                status: [status]
            }
        })
        .then(() => {resolve(data)})
        .catch(() => {reject("No results returned")})
    });
    //     var returnStatus = employees.filter(employees => employees.status == status);
    //     if(employees.length == 0){ reject("No Data available!"); }
    //     else{ resolve(returnStatus); }
    // reject();
}

//getEmployeesByDepartment function
module.exports.getEmployeesByDepartment = (department) => {
    return new Promise((resolve, reject) => {
        Employee.findAll({
            where: {
                department: [department]
            }
        })
        .then(() => {resolve(data)})
        .catch(() => {reject("No results returned")})
    });
    //     var returnDepartment = employees.filter(employees => employees.department == Department);
    //     if(employees.length == 0){ reject("No Data available!"); }
    //     else{ resolve(returnDepartment); }
    // reject();
}

//getEmployeesByManager function
module.exports.getEmployeesByManager = (Manager) => {
    return new Promise((resolve, reject) => {
        Employee.findAll({
            where: {
                employeeManagerNum: [Manager]
            }
        })
        .then(() => {resolve(data)})
        .catch(() => {reject("No results returned")})
    });
    //     var returnD
    // });
    //     var returnManager = employees.filter(employees => employees.employeeManagerNum == Manager);
    //     if(employees.length == 0){ reject("No Data available!"); }
    //     else{ resolve(returnManager); }
    // reject();
}

//getEmployeesByNum function
module.exports.getEmployeesByNum = (Num) => {
    return new Promise((resolve, reject) => {
        Employee.findAll({
            where: {
                employeeNum: [Num]
            }
        })
        .then(() => {resolve(data)})
        .catch(() => {reject("No results returned")})
    });
    //     var returnNum = employees.filter(employees => employees.employeeNum == Num);
    //     if(employees.length == 0){ reject("No Data available!"); }
    //     else{ resolve(returnNum); }
    // reject();
}

//updateEmployee function
module.exports.updateEmployee = (employeeData) =>{
    // return new Promise((resolve, reject)=>{
    //     var index = employees.findIndex(employees => employees.employeeNum == employeeData.employeeNum);
    //     employees.splice(index, 1, employeeData);
    //     resolve();
    // })
    reject();
}