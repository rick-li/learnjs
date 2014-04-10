var path = require('path');
var express = require('express');

var app = require('express')();
console.log('ENV is ', process.env.NODE_ENV);
var port = (process.env.NODE_ENV == 'local') ? 3000 : 80;
console.log('Use port ', port);
app.set('port', port);
// console.log(__dirname + '');
app.use(express.static(__dirname));
app.use(app.router);
app.use(express.json());


var server = require('http').createServer(app).listen(port);
var io = require('socket.io').listen(server);


io.sockets.on('connection', function(socket) {
  var address = socket.handshake.address;
  console.log('New connection established from ', address);

  socket.on('clientMsg', function(data) {
    console.log('received:', address, data);
    data.address = address;
    io.sockets.emit('serverMsg', data);
  });
});
