//https://github.com/substack/stream-handbook
var fs = require('fs');
var stream = fs.createReadStream(__dirname + '/data.txt');
// var offset = 0;
// stream.on('readable', function() {
//   // console.dir('====readable====');
//   var buf = stream.read();
//   for (; offset < buf.length; offset++) {
//     if (buf[offset] === 0x0a) {
//       console.log(buf.slice(0, offset).toString());
//       buf = buf.slice(offset + 1);
//       offset = 0;
//       stream.unshift(buf);
//       return;
//     }
//   }
//   stream.unshift(buf);
// });




// stream.pipe(function(err, data) {

// }).pipe(function(err, data) {

// });


// var Readable = require('stream').Readable;

// var rs = new Readable();
// rs.push('=========>beep ');
// rs.push(null);
//the contents are buffered inside the rs
//until the consumer is ready to read them


// var c = 97;
// rs._read = function(size) {
//   console.log('\n size is ', size);
//   rs.push(String.fromCharCode(c++));
//   if (c > 'z'.charCodeAt(0)) {
//     rs.push(null);
//   }
// };
// rs.pipe(process.stdout);



// process.stdin.on('readable', function() {
//   console.log('=====> on readable===');
//   var buf = process.stdin.read();
//   console.dir(buf);
// });



var Readable = require('stream').Readable;
var Writable = require('stream').Writable;

var rs = new Readable();
var ws = new Writable();

var data = ['112中文我是中文34576\n', 'bbbbbbbbb\n', 'ccccccccccc\n', 'dddddddddddddd\n'];
// var data = ['112中文我是中文34576\n'];
console.log(data);
rs._read = function() {
  console.log('pushing ', data[0]);
  rs.push(data[0]);
  data.shift();
};

rs.on('readable', function() {
  console.log('===readable...', arguments);
});

rs.on('data', function() {
  console.log('===data...', arguments);
});

rs.on('end', function() {
  console.log('=======> end');
});

ws._write = function(chuck, enc, next) {
  console.log('chuck is ', chuck);
  console.log('Encoding is ', enc);
  next();
};
ws.on('write', function() {
  console.log('====writing...', arguments);
});

rs.pipe(ws); //pipe connects readable and writable



// var offset = 0;
// rs.on('readable', function() {
//   var buf = rs.read();
//   if (!buf) return;
//   for (; offset < buf.length; offset++) {
//     if (buf[offset] === 0x0a) {
//       console.log('line end reached ', offset);
//       console.log(buf.slice(0, offset).toString());
//       buf = buf.slice(offset + 1); //unshift can put back the unwanted data when read gives you more data than you want.
//       rs.unshift(buf);
//       offset = 0;
//       return;
//     }
//   }
//   rs.unshift(buf);
// });
