define(function(require, exports, module) {
  var React = require('react');
  var RoomStore = require('RoomStore');
  var MessageStore = require('MessageStore');
  var RoomActionCreator = require('RoomActionCreator');
  var RoomContainer = React.createClass({
    getInitialState: function() {
      return this.getStatesFromStore();    
    },
    getStatesFromStore: function() {
      var currentId = RoomStore.getCurrentId();
      var rooms = RoomStore.getAll();
      return {
        currentId: currentId,
        rooms: rooms
      };
    },
    componentDidMount: function() {
      RoomStore.addChangeListener(this._onChange);
    },
    _onChange: function() {
      this.setState(this.getStatesFromStore());
    },
    _handleClick: function(roomid) {
      return function(e) {
        console.log('click room: ',roomid);  
        RoomActionCreator.clickRoom(roomid);
      };
    },
    render:function() {
      var that = this;
      var childs = this.state.rooms.map(function(room) {
        var className = 'fc-room ';
        if(room.roomid === that.state.currentId){
          className += 'selected';
        }
        return <div data-id={room.roomid} onClick={that._handleClick(room.roomid)} className={className} >
            <div className="fc-room-name">{room.name}</div>
            <div className="fc-room-lastmsg">{room.lastMsg}</div>
          </div>;
        });
      return (
        <div className="fc-room-container layout-col">
        {childs}
        </div>
      );
    }
  });
  module.exports = RoomContainer;
});