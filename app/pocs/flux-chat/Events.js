define(function(require, exports, module) {
  var o = $({});
  module.exports = {
    trigger: function() {
      o.trigger.apply(o, arguments);
    },
    on: function() {
      o.on.apply(o, arguments);
    },
    off: function() {
      o.off.apply(o, arguments);
    }
  };
});