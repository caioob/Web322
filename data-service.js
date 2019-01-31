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
