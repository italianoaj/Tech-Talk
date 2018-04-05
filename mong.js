#!/usr/bin/node

var MongoClient = require("mongodb").MongoClient;
var express = require("express");
var app = express();
var db;
var bodyParser=require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
var users = [{"username":"admin", "password":"Welcome123"}, {"username":"bowsera","password":"0000"}, {"username":"wojtowiczak","password":"0001"}, {"username":"italianoaj","password":"Ant@Ita1"}, {"username":"barbianbm","password":"0002"}, {"username":"rozalskiji","password":"0003"}, {"username":"whitekj","password":"0004"}, {"username":"hendersonl","password":"0005"}, {"username":"oliphantlt","password":"0006"}, {"username":"ikedam","password":"0007"}, {"username":"bountsebese","password":"0008"}, {"username":"nouafowankosj","password":"0009"}, {"username":"topaliant","password":"0010"}, {"username":"martinjakozd","password":"0011"}];


app.get('/', (req,res) => {
    res.render('index.ejs');
});


app.get('/messages', (req,res) => {
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
    for (var i=0; i<users.length; i++){
        if(req.body.username==users[i].username && req.body.password==users[i].password){
            console.log("login attempt successful");
            var obj={"login":true};
            res.send(JSON.stringify(obj));
            res.end();
        }  
    }
    if(obj){
        return;
    }
    console.log("login attempt failed");
    var obj={"login":false};
    res.send(JSON.stringify(obj));
});

MongoClient.connect('mongodb://localhost:27017', (err, client) => {
	if (err) return console.log(err);
	db = client.db('italianoajDB')
	app.listen(4572, () =>{
		console.log('listening on 4572')
	});
});
