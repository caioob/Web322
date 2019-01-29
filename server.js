var express = require("express");
<<<<<<< HEAD
var path = require("path");
=======
>>>>>>> 0c2c71d318d94242862d5df15943ca1adc12b663
var app = express();

var port = process.env.PORT || 8080;

//Starting message
function onHttpStart(){
    console.log("Express http server listening on port " +port);
}

<<<<<<< HEAD
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
=======
//setting up home page
>>>>>>> 0c2c71d318d94242862d5df15943ca1adc12b663
