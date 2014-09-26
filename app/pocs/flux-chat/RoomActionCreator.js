define(function(require, exports, module) {
  var AppDispatcher = require('AppDispatcher');
  module.exports = {
    clickRoom: function(roomid) {
      AppDispatcher.handleViewAction({
        type: 'clickRoom',
        roomid: roomid
      });
    }
  };
});