var express = require("express");
var path = require("path");
var app = express();

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

app.listen(port, onHttpStart);