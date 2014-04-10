var url = require('url');

module.exports.controller = function(app) {
    app.get('/item/:itemid', function(req, res) {
        // res.send('I\'m item, thanks');
        console.log('Item id is ', req.params['itemid']);
        var url_parts = url.parse(req.url, true);
        var query = url_parts.query;
        console.log('query is ', query);

        res.render('item', {
            name: 'I\'m item'
        });
    });
};