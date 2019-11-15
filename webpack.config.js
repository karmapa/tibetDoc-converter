var path = require('path');
var webpack = require('webpack');

module.exports = {
  mode: process.env.NODE_ENV,
  devtool: 'source-map',
  entry: {
    javascript: [
      'font-awesome-webpack!./assets/font-awesome.config.js',
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
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ProgressPlugin()
  ],
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        test: /bootstrap\/js\//,
        use: {
          loader: 'imports?jQuery=jquery'
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'react-hot'
          },
          {
            loader: 'babel'
          }
        ],
      },
      {
        test: /\.json$/,
        use: {
          loader: 'json-loader'
        }
      },
      {
        test: /\.scss$/,
        use: {
          loader: 'style!css!sass?outputStyle=expanded'
        }
      },
      {
        test: /\.css$/,
        use: {
          loader: 'style-loader!css-loader'
        }
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: "url?limit=10000&mimetype=application/font-woff"
        }
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: "url?limit=10000&mimetype=application/font-woff"
        }
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: "url?limit=10000&mimetype=application/octet-stream"
        }
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: "file"
        }
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: "url?limit=10000&mimetype=image/svg+xml"
        }
      },
      {
        test: /\.(png|jpg|cur)$/,
        use: {
          loader: 'url-loader?name=[path][name].[ext]&limit=8192'
        }
      },
      {
        test: /\.html$/,
        use: {
          loader: "file-loader?name=[name].[ext]"
        }
      }
    ]
  }
};
