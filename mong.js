#!/usr/bin/node

var MongoClient = require("mongodb").MongoClient;
var express = require("express");
var app = express();
var db;
var bodyParser=require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));



app.get('/', (req,res) => {
	res.render('index.ejs');
});

app.post('/testing', (req,res) => {
	console.log(req);	
});

app.get('/messages', (req,res) => {
    console.log("finish this shit");
});

app.post('/sendMessage', (req,res) => {
    var suffix;
    var prefix;
    
    time = new Date();
    if(time.getMinutes()<10){
        prefix="0";
    }else{
        prefix="";
    }
    if(time.getHours()<12){
        suffix="am";
    }else{
        suffix="pm";
    }
    var sent=time.getHours()+":"+prefix+time.getMinutes()+""+suffix;
    console.log(req.body);
    var username=req.body.username;
    var message=req.body.message;
   	console.log("request made at "+time.getHours()+":"+prefix+time.getMinutes()+""+suffix);
    db.collection('messages').save(req.body, (err, result)=> {
        if(err) return console.log(err);
        console.log("Saved data to italianoajDB");
        var obj = {"time":sent,"username":username,"message":message};
        res.send(JSON.stringify(obj));
    });
});

app.post('/login', (req, res) => {
    var suffix;
    var prefix;
    
    time = new Date();
    if(time.getMinutes()<10){
        prefix="0";
    }else{
        prefix="";
    }
    if(time.getHours()<12){
        suffix="am";
    }else{
        suffix="pm";
    }
    var sent=time.getHours()+":"+prefix+time.getMinutes()+""+suffix;
    var username='admin';
    var password='Welcome123';
    console.log("login attempt made at "+sent);
    console.log(req.body);
    if(req.body.username==username && req.body.password==password){
        console.log("login attempt successful");
        var obj={"login":true};
        res.send(JSON.stringify(obj));
    }else{
        console.log("login attempt failed");
        var obj={"login":false};
        res.send(JSON.stringify(obj));
    }
});

MongoClient.connect('mongodb://localhost:27017', (err, client) => {
	if (err) return console.log(err);
	db = client.db('italianoajDB')
	app.listen(4572, () =>{
		console.log('listening on 4572')
	});
});
