#!/usr/bin/node

var MongoClient = require("mongodb").MongoClient;
var express = require("express");
var app = express();
var db;
var bodyParser=require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');



app.get('/', (req,res) => {
     db.collection('testMessages').find().toArray(function(err, results) {
          res.render('index.ejs', {testMessages: results});
    });
});


app.get('/messages', (req,res) => {
    console.log("Yes i see you asking for messages");
     db.collection('testMessages').find().toArray(function(err, results) {
          var obj = {testMessages: results};
          res.send(JSON.stringify(obj));
    });
});

app.post('/sendMessage', (req,res) => {
    db.collection('testMessages').save(req.body, (err, result) => {
        if (err) return console.log(err)
        console.log(req.body);
        var username=req.body.username;
        var message=req.body.message;
        console.log("request made at "+req.body.time);
        db.collection('messages').save(req.body, (err, result)=> {
            if(err) return console.log(err);
            console.log("Saved data to italianoajDB");
            var obj = {"time":req.body.time,"username":username,"message":message};
            res.send(JSON.stringify(obj));
        });
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
    var buser='louis'
    console.log("login attempt made at "+sent);
    console.log(req.body);
    if((req.body.username==username && req.body.password==password) || (req.body.username==buser && req.body.password==password)){
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
