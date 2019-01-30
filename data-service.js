var employees;
var departments;
var fs = require("fs");

//initialize function. Initializes the JSON files
module.exports.initialize = function(){
    return new Promise(function(resolve, reject){
        try{
            fs.readFile("./data/departments.json", function(err, data){
                if(err) reject(err);
                departments = JSON.parse(data);
            });
            fs.readFile("./data/employees.json", function(err, data){
                if(err) reject(err);
                employees = JSON.parse(data);
            });
        }
        catch{
            reject("Unable to read file");
        }
        resolve("Files successfully opened");
    });
};