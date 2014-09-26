define(function(require, exports, module) {
  var Dispatcher = require('../../bower_components/flux/dist/Flux').Dispatcher;

  var AppDispatcher = $.extend(new Dispatcher(), {
    handleViewAction: function(action) {
      var payload = {
        source: 'viewAction',
        action: action
      };
      this.dispatch(payload);
    },
    handleServerAction: function(action) {
      var payload = {
        source: 'serverAction',
        action: action
      };
      this.dispatch(payload);
    }
  });

  module.exports = AppDispatcher;
});