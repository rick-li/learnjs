require.config({
  baseUrl: '.',
  paths: {
    domReady: '../../bower_components/domReady/domReady',
    jquery: '../../bower_components/jquery/dist/jquery.min'
  },
  shim: {
    'start': ['jquery'] //makes jquery a dep of start, always load first.
  }
});
