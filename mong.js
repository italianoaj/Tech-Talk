#!/usr/bin/node
//Fields
var MongoClient = require("mongodb").MongoClient;
var express = require("express");
var app = express();
var db;
var bodyParser=require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
var users = [{"username":"admin", "password":"Welcome123", "type":"admin"}, {"username":"bowsera","password":"0000", "type":"user"}, {"username":"wojtowiczak","password":"0001", "type":"user"}, {"username":"italianoaj","password":"Ant@Ita1", "type":"user"}, {"username":"barbianbm","password":"0002", "type":"user"}, {"username":"rozalskiji","password":"0003", "type":"user"}, {"username":"whitekj","password":"0004", "type":"user"}, {"username":"hendersonl","password":"0005", "type":"user"}, {"username":"oliphantlt","password":"0006", "type":"user"}, {"username":"ikedam","password":"0007", "type":"user"}, {"username":"bountsebese","password":"0008", "type":"user"}, {"username":"nouafowankosj","password":"0009", "type":"user"}, {"username":"topaliant","password":"0010", "type":"user"}, {"username":"martinjakozd","password":"0011", "type":"user"}, {"username":"test","password":"test","type":"test"}];
/**
*This function is used when the client requests access to the website. The client is then provided the page.
*@author italianoaj
**/
app.get('/', (req, res) => {
    res.render('index.ejs');
});
/**
*This function is ran when the admin removes an account from the server.
*@author italianoaj
**/
app.delete('/users', (req, res) => {
    users.splice(req.body.index, 1);
    res.send(JSON.stringify(users));
});
/**
*This function is ran when the admin creates new accounts.
*@author italianoaj
**/
app.post('/users', (req, res) => {
    var obj={"username":req.body.username, "password":req.body.password, "type":req.body.type};
    users.push(obj);
    res.send(JSON.stringify(users));
});
/**
*This function runs when any user changes their password.
*@author italianoaj
**/
app.put('/users', (req, res) => {
    var changed=false;
    for (var i=0; i<users.length; i++){
        if(req.body.username==users[i].username){
            changed=true;
            users[i].password=req.body.password;
        }
    }
    if(changed){
        console.log(req.body.username+" password updated");
    }else{
        console.log(req.body.username+" password update failed");
    }
    res.send(JSON.stringify(users));
});
/**
*This function is executed when an admin asks for data in the user table.
*@author italianoaj
**/
app.get('/admin', (req,res) => {
    res.send(JSON.stringify(users));
});
/**
*This function is called every 1000 milliseconds by the clients in order to pull new messages.
*@author italianoaj
**/
app.get('/messages', (req,res) => {
     db.collection('testMessages').find().toArray(function(err, results) {
          var obj = {testMessages: results};
          res.send(JSON.stringify(obj));
    });
});
/**
*This function is used when an account sends a new message.
*@author italianoaj
**/
app.post('/sendMessage', (req,res) => {
    db.collection('testMessages').save(req.body, (err, result) => {
        if (err) return console.log(err)
        var username=req.body.username;
        var message=req.body.message;
        console.log("request made at "+req.body.time);
        db.collection('messages').save(req.body, (err, result)=> {
            if(err) return console.log(err);
            console.log("New message from "+username);
            var obj = {"time":req.body.time,"username":username,"message":message};
            res.send(JSON.stringify(obj));
        });
    });
});
/**
*This function is called when a user is attempting to log into the website.
*@author italianoaj
**/
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
            console.log(req.body.username+" login attempt successful");
            if(users[i].type=="admin"){
                var obj={"login":true, "admin":true};
                res.send(JSON.stringify(obj));
                res.end();
                return;
            }else{  
                var obj={"login":true, "admin":false};
                res.send(JSON.stringify(obj));
                res.end();
            }
        }  
    }
    if(obj){
        return;
    }
    console.log("login attempt failed");
    var obj={"login":false};
    res.send(JSON.stringify(obj));
});
/**
*This function is ran upon startup of the webserver. It allows clients to connect to the site, server, and database.
*@author italianoaj
**/
MongoClient.connect('mongodb://localhost:27017', (err, client) => {
	if (err) return console.log(err);
	db = client.db('italianoajDB')
	app.listen(4572, () =>{
		console.log('listening on 4572')
	});
});