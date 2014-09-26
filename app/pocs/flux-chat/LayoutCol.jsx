define(function(require, exports, module) {
  var React = require('react');
  var LayoutCol = React.createClass({
    render:function() {
      return (
        <div className="layout-col">
          {this.props.children}
        </div>
      );
    }
  });
  module.exports = LayoutCol;
});