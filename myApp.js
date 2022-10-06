const { response } = require('express');
let express = require('express');
var bodyparser= require('body-parser');
const { acceptsLanguages } = require('express/lib/request');
let app = express();
require('dotenv').config()
app.use(bodyparser.urlencoded({extended:true}));
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

app.get("/:wo/echo",function(req,res){
    var word = req.params.wo
    console.log(word);
    res.json({echo:word});
});

app.get("/name",function(req,res){
    var {first:firstname,last:lastname} = req.query;
    console.log(firstname,lastname);
    res.json({
        name: `${firstname} ${lastname}`
    });
});

app.post("/name",function(req,res){
  console.log("hi");
  var string = req.body.first + " " + req.body.last;
  console.log(string);
  res.json({ name: string });
});
console.log("Hello World");


































 module.exports = app;
