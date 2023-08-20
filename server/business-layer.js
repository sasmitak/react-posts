var express = require("express");
var cors = require("cors");
var mongoClient = require("mongodb").MongoClient;

var conStr = "mongodb://127.0.0.1:27017";

var app = express();
app.use(cors());

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.get("/users",(req,res)=>{
    mongoClient.connect(conStr)
    .then(obj=>{
        var database = obj.db("posts");
        database.collection("users").find({}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        })
    })
    .catch(err=>{
        console.log(err);
    })
});

app.post("/registeruser",(req,res)=>{
    userDetails = {
        UserName : req.body.UserName,
        Password : req.body.Password,
        Age: parseInt(req.body.Age),
        Email : req.body.Email,
        Mobile : req.body.Mobile
    };
    mongoClient.connect(conStr)
    .then(obj=>{
        var database = obj.db("posts");
        database.collection("users").insertOne(userDetails)
        .then(()=>{
            console.log("Record Inserted");
            res.redirect("/users");
        })
    })
});

app.listen("5000");
console.log(`Server Started : http://127.0.0.1:5000`);


