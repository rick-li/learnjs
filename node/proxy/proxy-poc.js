var connect = require('connect');
var url = require('url');
// var proxy = require('./proxy-middleware');
var proxy = require('./proxy');
var request = require('request');

var baseUrl = 'https://www.citivelocity.com/mobile';
var mobileUrl = 'http://localhost:8888'
var app = connect();
var proxyConfigs = [{
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
}];
app.use('/', proxy(proxyConfigs));

app.listen(9000);

//tests
request.get('http://localhost:9000/mobile/Mobile.jsp');
// request.get('http://localhost:9000/siteminderagent/forms/login.fcc');
