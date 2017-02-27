var config = require('../config')
if (!config.tasks.js) return
var path = require('path');
var webpack = require('webpack');
var jsSrc = path.resolve(config.root.src, config.tasks.js.src)

module.exports = {
  devtool: 'inline-source-map',

  entry: function() { return {} },

  resolve: {
    extensions: ['.ts', '.js']
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader', 'angular2-template-loader']
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      }
    ]
  },

  plugins: [
    // Workaround for angular/angular#11580
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      jsSrc, // location of your src
      {} // a map of your routes
    )
  ]
}
