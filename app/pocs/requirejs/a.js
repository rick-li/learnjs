define(function(require, exports, module) {
  console.log('loading a');
  var b = require('b'); 
  require('domReady')(function() {
    //ensure dom is ready....
    console.log('dom is ready');
    console.log('b is ', b); //b is lazy loaded.

  });
});

require(['a']);//loading self.