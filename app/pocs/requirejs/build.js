
{
  mainConfigFile: './main.js',
  appDir: '.',
  dir: './dist',
  include: [],
  modules: [
    {
      name: './a',
      include: ['../../../bower_components/alameda/alameda.js','jquery'],
      exclude: ['b']
    },
    {
      name: './b',
      include: ['c']
    }
  ],
  optimize: "none"
}