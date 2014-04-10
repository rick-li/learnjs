module.exports.controller = function(app) {
    app.all('/admin/items', function(req, res, next) {
        console.log('====> admin items');
        res.send('admin items is....');
    });
};