define(function(require, exports, module) {
  require('../../bower_components/jquery/dist/jquery.min');
  var React = require('react');
  var ServerUtils = require('ServerUtils');
  var MessageContainer = require('jsx!MessageContainer');
  var RoomContainer = require('jsx!RoomContainer');
  var App = React.createClass({
    getDefaultProps : function() {
      return {messages: [{txt:'aaaa'}, {txt: 'bbbbb'}, {txt: 'cccccc'}], rooms:[{name: "room1", lastMsg: 'aaa last msg'}, {name: "room2"}, {name: "room3"}]};
    },
    render: function() {
     return (
      <div className="all-container">
        <RoomContainer rooms={this.props.rooms}></RoomContainer>
        <MessageContainer messages={this.props.messages}></MessageContainer>
      </div>)

    }
  });
  ServerUtils.getAllRooms();
  ServerUtils.getAllMessages();

  React.renderComponent(<App/>, document.getElementById('container'));
});


