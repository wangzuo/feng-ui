var StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');

var paths = [
  '/',
  '/css',
  '/css/forms',
  '/css/avatars',
  '/css/buttons',
  '/css/boxes',
  '/css/cards'
];

module.exports = {
  entry: {
    site: './entry.js',
    styles: './styles.js'
  },

  output: {
    filename: '[name].bundle.js',
    path: __dirname + '/builds',
    libraryTarget: 'umd'
  },

  module: {
    loaders: [
      { test: /\.js$/, ignore: /node_modules/, loader: 'babel-loader' },
      { test: /\.example$/, loader: 'babel-loader!example-loader' },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader!postcss-loader' },
    ]
  },

  example: {
    'Avatar': '../../react/avatar',
    'Spinner': '../../react/spinner',
    'ButtonGroup': '../../react/button-group',
    'Button': '../../react/button',
    'Field': '../../react/field',
    'Form': '../../react/form',
    'Checkbox': '../../react/checkbox',
    'Box, BoxContent, BoxFooter': '../../react/box',
    'Card': '../../react/card'
  },

  /*
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'babel-core/browser': 'babel'
  },
  */

  postcss: function() {
    return require('./processors');
  },

  plugins: [
    new StaticSiteGeneratorPlugin('site.bundle.js', paths, {})
  ]
};

