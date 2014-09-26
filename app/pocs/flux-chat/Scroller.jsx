define(function(require, exports, module) {
  
  var React = require('react');

  var Scroller = React.createClass({

    render:function() {
      
      return (
        <div class="scrollable-container">
          {this.props.children}
        </div>
      );
    }

  });
  module.exports = Scroller;
});