require.config({
    base_url: 'app/scripts',
    paths: {
        'jquery': '../bower_components/jquery/jquery.min',
        'zepto': '../bower_components/zepto/zepto.min',
        'pjax': '../bower_components/jquery-pjax/jquery.pjax',
        "snapjs": "../bower_components/snapjs/snap.js",
        "underscore": "../bower_components/underscore/underscore.js",
    },
    shim: {
        'pjax': ['jquery'],
        'app': ['pjax']
    }
});
// require(['app'], function() {

// });