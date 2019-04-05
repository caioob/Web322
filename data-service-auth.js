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

module.exports.registerUser = (userData) => {
    return new Promise((resolve, reject) => {
        if(userData.password != userData.password2) {reject("Passwords do not match");}
        else{
            let newUser = new User(userData);
            newUser.save((err) => {
                if(err === 11000){reject("User Name already taken");}
                else if (err != 11000){reject("There was an error creating the user:" +err)}
                else if (err == null){resolve()}
            })
        }
    });
}

module.exports.checkUser = (userData) => {
    return new Promise ((resolve, reject) => {
        User.find({userName: userData.userName})
        .exec()
        .then ((users) => {
            if (users == null) {reject("Unable to find user:")}
            else if(users[0].password != userData.password){
                reject("Incorrect Password for user:" +userData.userName);
            }
            else if(users.password == userData.password) {
                users[0].push({dateTime: (new Date()).toString(), userAgent: userData.userAgent});
                User.update(
                    {userName: userData.userName},
                    {$set: {loginHistory: users[0].loginHistory}}
                )
                .exec()
                .then(() =>{resolve(users[0])})
                .catch(() => {reject("There was an error verifying the user:" +err);}) 
            }
        })
        .catch(() => {reject("Unable to find user:" +userData.userName);}) 
    })
}