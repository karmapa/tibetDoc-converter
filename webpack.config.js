var path = require('path');
var webpack = require('webpack');
var bootstrapEntryPoints = require('./webpack.bootstrap.config.js');

module.exports = {

  devtool: 'source-map',

  entry: {
    javascript: [
      'bootstrap-sass!./assets/bootstrap-sass.config.js',
      './src/index'
    ],
    html: './index.html'
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
    loaders: [
      {
        test: /bootstrap\/js\//,
        loader: 'imports?jQuery=jquery'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel'],
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass?outputStyle=expanded'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(ttf|eot|svg)$/,
        loader: 'file-loader?name=[path][name].[ext]'
      },
      {
        test: /\.woff2?$/,
        loader: 'url-loader?name=[path][name].[ext]&limit=10000&minetype=application/font-woff'
      },
      {
        test: /\.(png|jpg|cur)$/,
        loader: 'url-loader?name=[path][name].[ext]&limit=8192'
      },
      {
        test: /\.html$/,
        loader: "file-loader?name=[name].[ext]",
      }
    ]
  }

};