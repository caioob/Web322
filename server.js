var express = require("express");
var app = express();

var port = process.env.PORT || 8080;

//Starting message
function onHttpStart(){
    console.log("Express http server listening on port " +port);
}

//setting up home page
