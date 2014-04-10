var path = require('path');
var express = require('express');
var app = require('express')();
app.set('port', process.env.PORT || 3000);
// console.log(__dirname + '');
app.use(express.static(__dirname));
var server = require('http').createServer(app).listen(app.get('port'));
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
