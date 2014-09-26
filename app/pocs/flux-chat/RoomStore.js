define(function(require, exports, module) {
  var Events = require('Events');
  var AppDispatcher = require('AppDispatcher');
  var MessageStore = require('MessageStore');


  var _rooms = [];
  var _currentRoomId;

  var RoomStore = $.extend({
    getAll: function() {
      return _rooms;
    },

    getCurrentId: function() {
      return _currentRoomId;
    },
    
    addChangeListener: function(callback) {
      this.on('change', callback);
    },

    emitChange: function() {
      this.trigger('change');
    }
  }, Events);
  var getLastMessages = function(messages) {
    if(!_rooms.length){
      return;
    }
    Object.keys(messages).forEach(function(roomid) {
      if(messages[roomid] && messages[roomid].length){
        _rooms.forEach(function(room) {
          if(room.roomid == roomid){
            room.lastMsg = messages[roomid][0];
          }
        })
        
      }
    });
  };
  RoomStore.dispatchToken = AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.type){
      case 'clickRoom':
        _currentRoomId = action.roomid;
        RoomStore.emitChange();
      break;
      case 'createMsg':
        // RoomStore.emitChange();
      break;

      case 'receiveAllRooms':
        _rooms = action.rooms;
        _currentRoomId = _rooms[0].roomid;
        RoomStore.emitChange();
      break;
      case 'receiveAllMessages':
        AppDispatcher.waitFor([MessageStore.dispatchToken]);
        getLastMessages(MessageStore.getAllMessages());
        RoomStore.emitChange();
      break;
    }
  });
  $.extend(exports, RoomStore);
});