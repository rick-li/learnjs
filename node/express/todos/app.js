/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var fs = require('fs');

var app = express();
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.json());
app.use(express.bodyParser());

app.use(express.static(path.join(__dirname, '../../../app')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}


app.get('/items', function(req, res, next) {
    var data = [{name: 'aaaa', done: false}, {name: 'bbbb', done: false}, {name: 'cccc', done: false}];
    res.send(data);
});

app.post('/items', function(req, res, next) {
    console.log(req.params);
    console.log(req.body);
    res.send('hello '+req.params['itemId']);
});




http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});