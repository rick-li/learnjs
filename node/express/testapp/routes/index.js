/*
 * GET home page.
 */

exports.index = function(req, res) {
    res.render('index', {
        title: 'Express'
    });
};

exports.all = function(users) {
    return function(req, res) {
        res.render('all', {
            title: 'Express',
            users: users
        });
    };
};