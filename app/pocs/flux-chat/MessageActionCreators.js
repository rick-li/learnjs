define(function(require, exports, module) {
  var AppDispatcher = require('AppDispatcher');
  module.exports = {
    createMsg: function(text) {
      AppDispatcher.handleViewAction({
        type: 'createMsg',
        text: text
      });
    }
  };
});