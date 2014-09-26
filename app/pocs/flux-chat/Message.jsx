define(function(require, exports, module) {
  
  
  var React = require('react');

  var Message = React.createClass({

    render:function() {
      return (
        <div className="fc-msg">
          <p>{this.props.message.txt}</p>
        </div>
      );
    }

  });
  module.exports = Message;
});