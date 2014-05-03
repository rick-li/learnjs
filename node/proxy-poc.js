var fs = require('fs');
var connect = require('connect');
var url = require('url');
// var proxy = require('./proxy-middleware');
var proxy = require('./proxy');
var request = require('request');
var connectRoute = require('connect-route');


var baseUrl = 'https://www.citivelocity.com/mobile';
var mobileUrl = 'http://localhost:8888'
var app = connect();
//================== Proxy config =====================//
var proxyConfigs = {
  ua: 'android', //android|ios|chrome|ie
  urlRules: [{
    pattern: '/mobile/eppublic/*', //proxy the static resources to localhost
    target: 'http://localhost:8888'
  }, {
    pattern: '/siteminderagent/forms/login.fcc',
    target: 'https://uat.citivelocity.com/',
    method: 'GET'

  }, {
    pattern: '/siteminderagent/forms/login.fcc',
    target: 'https://www.citivelocity.com/',
    headers: {
      'x-citiportal-mobile-base': '2.0',
      'x-citiportal-mobile-env': 'prod'
    },
    method: 'POST'
  }, {
    pattern: '*',
    target: 'https://www.citivelocity.com/'
  }]
};

app.use(connectRoute(function(router) {
  //===================Put test data here=================================//
  router.get('/CompositePageService/mobile/mobile/CitVelMktBuzzMob', fromFile('./test-data/mb.json'));
  router.get('/CompositePageService/mobile/mobile/SomeOther/*', function(req, res, next) {
    //custom reponse
    res.end('');
  });

}));

app.use('/', proxy(proxyConfigs));
app.listen(9000);


function fromFile(testFile) {
  return function(req, res, next) {

    fs.readFile(testFile, {
      encoding: 'UTF-8'
    }, function(err, data) {
      if (err) {
        console.log('failed to read ', err);
      }
      res.end(data);
    });
  };
}

//tests
// request.get('http://localhost:9000/mobile/Mobile.jsp');
// request.get('http://localhost:9000/siteminderagent/forms/login.fcc');
