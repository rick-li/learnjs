module.exports.controller = function(app) {
    app.get('/forward', function(req, res, next) {
        console.log('Forwarded to item');
        req.url = '/item/123?b=3';
        console.log('Should forward to /item');
        next('route');
    });
};