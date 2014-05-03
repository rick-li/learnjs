var q = require('q');
var assert = require('assert');

describe('Q', function() {
  describe('fcall', function() {
    it('should fcall fn', function(done) {
      q.fcall(function() {
        var defer = q.defer();
        console.log('in fcall');
        setTimeout(function() {
          console.log('in fcall timeout.');
          defer.resolve();
        }, 1000);
      }).then(function() {
        console.log('in then');
        assert(true);
        done();
      });
    });
  });

  describe('nfcall', function() {
    function someAsyncMtd(callback) {
      setTimeout(function() {
        console.log('timed out.');
        callback();
      }, 1000);
    }
    it('shouild nfcall ', function(done) {
      q.nfcall(someAsyncMtd).then(function() { //adaptor, for method accepts a callback fn(err, data){...}
        assert(true);
        done();
      });
    });
  });
});