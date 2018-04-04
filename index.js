#!/usr/bin/node

var app = require("express")();
var port = 4572;
var https = require('https').Server(app);
var io = require('socket.io')(https);


app.get('/', function(req, res){
    res.sendFile('/home/italianoaj/mongo_ex/html_docs/index.html');
});


io.on('connection', function(socket){
    socket.on('message', function(msg){
        io.emit('message', msg);
    });
});

app.listen(port, function(){
    console.log("Server started on :"+port);
});