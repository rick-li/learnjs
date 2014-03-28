require.config({
    base_url: 'app/scripts',
    paths: {
        'jquery': '../bower_components/jquery/jquery.min',
        'zepto': '../bower_components/zepto/zepto.min'
    },
    shim: {
        'app': ['zepto']
    }
});
require(['app'], function() {
    console.log('success');
});