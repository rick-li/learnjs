define(function(require, exports, module) {
  var React = require('react');
  var MessageComposer = require('jsx!MessageComposer');
  var MessageStore = require('MessageStore');
  var RoomStore = require('RoomStore');

  var MessageContainer = React.createClass({
    getInitialState: function() {
      return this._getStateFromStore();
    },

    componentDidMount: function() {
      MessageStore.addChangeListener(this._onChange);
    },

    _getStateFromStore: function() {

      var roomId = RoomStore.getCurrentId();
      var messages = MessageStore.getMessagesByRoom(roomId);
      return {messages : messages};
    },

    _onChange: function() {
      this.setState(this._getStateFromStore());
    },

    render:function() {
      var childs = this.state.messages.map(function(message) {
          return <div className="fc-msg">{message.msgbody}</div>;
        });
      return (
        <div className="fc-msg-container layout-col">
          {childs}
          <MessageComposer/>
        </div>
      );
    }
  });
  module.exports = MessageContainer;
});