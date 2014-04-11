var express = require('express');
var mongoose = require('mongoose');

var env = process.env.NODE_ENV;
console.log('ENV is ', env);
//================ Mongoose================
var localMongoConn = 'mongodb://cvmobilevm.apac.nsroot.net:27017/chat-poc';
var remoteMongoConn = 'mongodb://rick-li:citi1234@ds043047.mongolab.com:43047/chat-poc';
var mongoConn = env === 'local' ? localMongoConn : remoteMongoConn;
mongoose.connect(mongoConn);
var Message = mongoose.model('Message', {
  text: String,
  address: {
    address: String,
    port: Number
  }
});

//================Express===================
var app = require('express')();
var port = env === 'local' ? 3000 : 80;
console.log('Use port ', port);
app.set('port', port);
app.use(express.static(__dirname));
app.use(app.router);
app.use(express.json());
var server = require('http').createServer(app).listen(port);

app.get('/historyMessages', function(req, res, next) {
  Message.find().limit(20).exec(function(err, msgs) {
    if (err) {
      console.log('Error ', err);
      next();
    }
    console.log('messages ' + msgs.length);
    res.send(msgs);
  });
});

//================SocketIO===================
var io = require('socket.io').listen(server);
io.sockets.on('connection', function(socket) {
  var address = socket.handshake.address;
  console.log('New connection established from ', address);

  socket.on('clientMsg', function(message) {
    console.log('received:', address, message);
    message.address = address;
    io.sockets.emit('serverMsg', message);
    var mMsg = new Message(message);
    mMsg.save();
  });
});
