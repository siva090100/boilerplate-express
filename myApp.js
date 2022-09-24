const { response } = require('express');
let express = require('express');
let app = express();
require('dotenv').config()
app.use("/public",express.static(__dirname+"/public"));

app.use(function(req,res,next){
    
    var string = req.method + " " + req.path + " - " + req.ip;
    console.log(string);
    next();
});
app.get('/',
function(req,res){
    res.sendFile(__dirname+'/views/index.html');
});

app.get('/json',
function(req,res)
{  
    if(process.env.MESSAGE_STYLE  == "uppercase")
    var response = "Hello World".toUpperCase();
    else
    var response = "Hello World";

    res.json({"message":response})
});

app.get('/now',function(req,res,next){

    req.time = new Date().toString();
    next();
},
function(req,res,next)
{
    res.json({"time":req.time});
});
console.log("Hello World");



































 module.exports = app;
