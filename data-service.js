var employees = [];
var departments = [];
var fs = require("fs");

//this function opens the json files
module.exports.initialize = function(){
    return new Promise(function (resolve, reject){
        try{
            fs.readFile("./data/departments.json", (err, data) =>{
                if (err) {reject(err);}
                departments = JSON.parse(data);
            });
            fs.readFile("./data/employees.json", (err, data) =>{
                if (err) {reject(err);}
                employees = JSON.parse(data);
            });
            resolve("File read completed successfully");
        }
        catch{
           reject("File read failed");
        }
    });
}

//this function sends the employees array
module.exports.getAllEmployees = function (){
    return new Promise(function (resolve, reject){
        if(employees.length == 0) {reject("No results returned");}
        resolve(employees);
    });
}

//this function returns the employees who are managers
module.exports.getManagers = function(){
    return new Promise(function (resolve, reject){
        var managers = [];
        if(employees.length == 0) {reject("No results returned");}
        for(var i = 0; i < employees.length; i++){
            if(employees[i].isManager == true) {managers.push(employees[i]);}
        }
        resolve(managers);
    });
}

//this function returns the departments array
module.exports.getDepartments = function(){
    return new Promise(function (resolve, reject){
        if(departments.length == 0) {reject("No results returned");}
        resolve(departments);
    });
}

//addEmployees function
module.exports.addEmployee = function(employeeData){
    return new Promise((resolve, reject) =>{
        if(employeeData.isManager == "on"){employeeData.isManager = true;}
        else{employeeData.isManager = false;}
        employeeData.employeeNum = employees.length + 1;
        employees.push(employeeData);
        resolve(employees);

    });
}

//getEmployeesByStatus function
module.exports.getEmployeesByStatus = (status) => {
    return new Promise((resolve, reject) => {
        var returnStatus = employees.filter(employees => employees.status == status);
        if(employees.length == 0){ reject("No Data available!"); }
        else{ resolve(returnStatus); }
    });
}

//getEmployeesByDepartment function
module.exports.getEmployeesByDepartment = (Department) => {
    return new Promise((resolve, reject) => {
        var returnDepartment = employees.filter(employees => employees.department == Department);
        if(employees.length == 0){ reject("No Data available!"); }
        else{ resolve(returnDepartment); }
    });
}

//getEmployeesByManager function
module.exports.getEmployeesByManager = (Manager) => {
    return new Promise((resolve, reject) => {
        var returnManager = employees.filter(employees => employees.employeeManagerNum == Manager);
        if(employees.length == 0){ reject("No Data available!"); }
        else{ resolve(returnManager); }
    });
}

//getEmployeesByNum function
module.exports.getEmployeesByNum = (Num) => {
    return new Promise((resolve, reject) => {
        var returnNum = employees.filter(employees => employees.employeeNum == Num);
        if(employees.length == 0){ reject("No Data available!"); }
        else{ resolve(returnNum); }
    });
}

//updateEmployee function
module.exports.updateEmployee = (employeeData) =>{
    return new Promise((resolve, reject)=>{
        var index = employees.findIndex(employees => employees.employeeNum == employeeData.employeeNum);
        employees.splice(index, 1, employeeData);
        resolve();
    })
}