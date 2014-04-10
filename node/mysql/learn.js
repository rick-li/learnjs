var mysql = require('mysql');
var pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'jvideo'
});

pool.query('SELECT count(*) AS solution FROM jvideo.jos_k2_items;', function(err, rows, fields) {
    if (err) throw err;

    console.log('The solution is: ', rows[0].solution);
});