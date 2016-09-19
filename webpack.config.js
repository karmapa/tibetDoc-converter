var path = require('path');
var webpack = require('webpack');

module.exports = {

  devtool: 'eval',

  entry: {
    html: './src/tibetdoc/index.html'
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  plugins: [
    new webpack.NoErrorsPlugin()
  ],

  resolve: {
    extensions: ['', '.js']
  },

  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        configFile: './.eslintrc',
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel'],
      },
      { test: /\.css$/, loader: 'style-loader!css-loader'},
      {
        test: /\.html$/,
        loader: 'file-loader?name=[name].[ext]',
      }
    ]
  }
};
