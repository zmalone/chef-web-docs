var config = require('../config')
if (!config.tasks.js) return
var path = require('path');
var webpack = require('webpack');
var jsSrc = path.resolve(config.root.src, config.tasks.js.src)

module.exports = {
  context: jsSrc,

  resolve: {
    extensions: ['.ts', '.js'],
    modules: [
      jsSrc,
      path.join(config.root.src, 'node_modules')
    ]
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        loaders: [{
          loader: 'awesome-typescript-loader',
          options: {
            configFileName: path.join(config.root.src, 'tsconfig.json')
          }
        } , 'angular2-template-loader']
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          "presets": ["es2015", "stage-1"],
          "plugins": []
        }
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
    ),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      chunks: ['main'],
      minChunks: function(module) {
        return module.resource && module.resource.includes('node_modules')
      }
    })
  ]
};
