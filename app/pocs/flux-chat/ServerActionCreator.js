define(function(require, exports, module) {
  AppDispatcher = require('AppDispatcher');
  module.exports = {
    receiveAllRooms: function(rooms) {
      AppDispatcher.handleServerAction({
        type: 'receiveAllRooms',
        rooms: rooms
      });
    },

    receiveAllMessages: function(messages) {
      AppDispatcher.handleServerAction({
        type: 'receiveAllMessages',
        messages: messages
      });
    }
  };
});