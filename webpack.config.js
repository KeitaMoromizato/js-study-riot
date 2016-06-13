const webpack = require('webpack');

module.exports = {
  entry: './client/app.js',
  output: {
    path: './out',
    filename: 'bundle.js'
  },
  module: {
    preLoaders: [
      {
        text: /\.tag$/,
        exclude: /node_modules/,
        loader: 'riotjs-loader',
        query: {
          type: 'none'
        }
      }
    ],
    loaders: [
      {
        test: /\.js$|\.tag$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  resolve: {
    modulesDirectories: ['node_modules', './client']
  }
};
