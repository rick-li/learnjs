/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var fs = require('fs');

var app = express();
var secretToken = 'some secret';
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
//http://www.senchalabs.org/connect/session.html#session
app.use(express.cookieParser(secretToken));
app.use(express.session({
    key: "testsite.session",
    secret: secretToken,
    cookie: {
        maxAge: 1000 * 60 * 60 * 6 // 6 hours
    }
}));

app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

function User(name, email) {
    this.name = name;
    this.email = email;
}

// Dummy users
var users = [
    new User('tj', 'tj@vision-media.ca'), new User('ciaran', 'ciaranj@gmail.com'), new User('aaron', 'aaron.heckmann+github@gmail.com')
];



app.get('/admin/*', function(req, res, next) {
    console.log('UserId is ', req.session.userId);

    if (!req.session.userId) {
        res.redirect('/login');
    } else {
        console.log('Already logged in ', req.session.userId);
        next();
    }
});

//mvc - controller
fs.readdirSync('./controllers').forEach(function(file) {
    console.log(file);
    if (file.substr(-3) == '.js') {
        var route = require('./controllers/' + file);
        //controller should export controller = function(){}
        route.controller(app);
    }
});

app.get('/', routes.index);
app.get('/all', routes.all(users));
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});