// setting up mongoose
const mongoose = require("mongoose");
var Schema = mongoose.Schema;

// defining userSchema
var userSchema = new Schema ({
    "userName": {
        type: String,
        unique: true
    },
    "password": String,
    "email": String,
    "loginHistory": [{
        "dateTime": Date,
        "userAgent": String 
    }] 
});

let User;

// Iitialize()
module.exports.Initialize = () => {
    return new Promise((resolve, reject) => {
        let pass1 = encodeURIComponent("pa$$word1");
        let db = mongoose.createConnection("mongodb+srv://caioob:44854443aA!@@senecaweb-az2od.mongodb.net/web322_a6?retryWrites=true");
        db.on('error', (err)=>{
            reject(err);
        });
        db.once('open', ()=>{
            User = db.model("users", userSchema);
            resolve("Connection Successfull");
        });
    });
}
