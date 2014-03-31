var _ = require('underscore');
var urlUtil = require('url');
var cookieUtil = require('cookie');
var regexQuote = require('regexp-quote');

var urlPattern = require('url-pattern');

var cookieStore = {};
var proxyConfigs = [];
var log = console.log;
module.exports = function(options) {
  // console.log('options: ', options);
  // parseProxyConfig(options);
  proxyConfigs = options;
  return function(req, resp, next) {
    // match path by patterns one by one, check if method match
    console.log('making request');

    var matchedConfig = matchReqByConfig(req);
    if (!matchedConfig) {
      next();
    }
    var target = matchedConfig.target;
    var opts = {};
    var urlOpts = urlUtil.parse(target);
    //https://uat.citivelocity.com/ ->
    //{protocol:,path:,pathname:,}
    var httpLib = urlOpts.protocol === 'https:' ? 'https' : 'http';
    var request = require(httpLib).request;

    urlOpts.path = req.url;
    urlOpts.method = req.method;
    urlOpts.headers = urlOpts.headers ? _.extend(req.headers, urlOpts.headers) : req.headers;
    Object.keys(cookieStore).forEach(function(key) {
      if (!req.headers.Cookie) {
        req.headers.Cookie = '';
      }
      var val = cookieStore[key];
      if (key && val) {
        req.headers.Cookie += key + '=' + val + ';'
      }
    });
    delete urlOpts.headers["host"];

    console.log(urlOpts);


    //TODO Organize with Q promise.
    var myReq = request(urlOpts, function(myRes) {

      var statusCode = myRes.statusCode,
        headers = myRes.headers,
        location = headers.location;
      console.log('location ', location);
      console.log('href ', urlOpts.href);
      // Fix the location
      if (statusCode > 300 && statusCode < 304 && location.indexOf(urlOpts.href) > -1) {
        // absoulte path
        console.log('302 ', location);
        headers.location = location.replace(urlOpts.href, '/');
      }
      // console.log(myRes.headers);
      var cookies = myRes.headers['set-cookie'] || [];
      console.log('cookies: ', cookies);
      cookies.forEach(function(cookie) {
        var oCookie = cookieUtil.parse(cookie);
        var key = Object.keys(oCookie)[0];
        var val = oCookie[key];
        cookieStore[key] = val;
      });
      // applyViaHeader(myRes.headers, opts, myRes.headers);
      resp.writeHead(myRes.statusCode, myRes.headers);
      myRes.on('error', function(err) {
        next(err);
      });
      myRes.pipe(resp);
    });
    myReq.on('error', function(err) {
      next(err);
    });
    if (!req.readable) {
      myReq.end();
    } else {
      req.pipe(myReq);
    }
  }
};

function matchReqByConfig(req) {
  if (!proxyConfigs) {
    return;
  }
  var matchedConfig = _.find(proxyConfigs, function(oConfig) {
    var pattern = oConfig.pattern;
    if (urlPattern.newPattern(pattern).match(req.url)) {
      if (!oConfig.method) { //match all methods
        return true;
      } else {
        return oConfig.method.toLowerCase() === req.method.toLowerCase();
      }
    }
  });
  if (matchedConfig) {
    log('url ', req.url, ' matched: ', matchedConfig.pattern, ' method: ', matchedConfig.method);
    return matchedConfig;
  }
  return false;
}

function ensureAllInBottom(configs) {
  // var newConfigs = [];
  // var allConfig;
  // configs.forEach(function (config) {
  //   if(config.pattern && config.pattern === '*'){

  //   }
  //   newConfigs.push(config);
  // });
}
