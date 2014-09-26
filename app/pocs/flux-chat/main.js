require.config({
  baseUrl: ".",
  jsx: {
    fileExtension: '.jsx'
  },
  paths: {
    "text": "../../bower_components/jsx-requirejs-plugin/js/text",
    "jsx": "../../bower_components/jsx-requirejs-plugin/js/jsx",
    "react": "../../bower_components/jsx-requirejs-plugin/js/react-with-addons-0.11.1",
    "JSXTransformer": "../../bower_components/jsx-requirejs-plugin/js/JSXTransformer-0.11.1"
  }
  
});
 
require(['jsx!app']);