define(function(require, exports, module) {
  var React = require('react');
  var MessageActionCreators = require('MessageActionCreators');
  var MessageComposer = React.createClass({
    createMsg: function() {
      var msg = this.refs.textInput.getDOMNode().value;
      MessageActionCreators.createMsg(msg);
    },
    render:function() {
      return (
        <div className="fc-msg-composer">
          <input ref="textInput" />
          <button onClick={this.createMsg}>Send</button>
        </div>
      );
    }
  });
  module.exports = MessageComposer;
});