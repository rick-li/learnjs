var mout = require('mout');
var cmd = require('bower/lib/util/cmd');

var source = 'git@github.com:rick-li/test-comp.git';
cmd('git', ['ls-remote', '--tags', '--heads', source])
    .spread(function (stdout) {
        var refs;

        refs = stdout.toString()
        .trim()                         // Trim trailing and leading spaces
        .replace(/[\t ]+/g, ' ')        // Standardize spaces (some git versions make tabs, other spaces)
        .split(/[\r\n]+/);

        return refs;
}).then(function(refs) {
    var tags = {};
    console.log("refs are ", refs);
    refs.forEach(function(line) {
        var match = line.match(/^([a-f0-9]{40})\s+refs\/tags\/(\S+)/);

        if (match && !mout.string.endsWith(match[2], '^{}')) {
            tags[match[2]] = match[1];
        }
    });
});

    
