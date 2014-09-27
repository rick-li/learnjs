define(function(require, exports, module) {
  var Events = require('Events');
  var AppDispatcher = require('AppDispatcher');
  var RoomStore = require('RoomStore');

  var _messages = {};

  var MessageStore = $.extend({
    getAllMessages: function() {
      return _messages;
    },
    getMessagesByRoom: function(room) {
      return _messages[room];
    },
    addChangeListener: function(callback) {
      this.on('change', callback);
    },
    emitChange: function() {
      this.trigger('change');
    },
    getCreatedMessageData: function(text) {
      var timestamp = Date.now();
      return {
        id: 'm_' + timestamp,
        roomid: RoomStore.getCurrentId(),
        by: 'Rick', // hard coded for the example
        date: new Date(timestamp),
        msgbody: text
      };
    }
  }, Events);

  var init = function(rawMessages) {
    rawMessages.forEach(function(messagesInRoom) {
      _messages[messagesInRoom.roomid] = messagesInRoom.msgs;
    });
  };

  MessageStore.dispatchToken = AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.type){
      case 'clickRoom':

      break;
      case 'createMsg':
        var currentRoom = RoomStore.getCurrentId();
        var message = MessageStore.getCreatedMessageData(action.text);
        _messages[currentRoom].push(message);
        MessageStore.emitChange();
      break;
      case 'receiveAllMessages':
        init(action.messages);
        MessageStore.emitChange();
      break;
      case 'receiveAllRooms':
      break;
    }
  });
  $.extend(exports, MessageStore);
});