var config = require('../config')
if (!config.tasks.js) return
var path = require('path')
var webpack = require('webpack')
var webpackMerge = require('webpack-merge')
var commonConfig = require('./webpack.common.js')

var jsSrc = path.resolve(config.root.src, config.tasks.js.src)
var jsDest = path.resolve(config.root.dest, config.tasks.js.dest)
var publicPath = path.join(config.tasks.js.dest, '/')

// Extend common config with webpack-hot-middleware entries
var entries = {};
for (var key in config.tasks.js.entries) {
  var entry = config.tasks.js.entries[key]
  entries[key] = ['webpack-hot-middleware/client?&reload=true'].concat(entry)
}

module.exports = webpackMerge(commonConfig, {
  devtool: 'source-map',

  entry: entries,

  output: {
    path: path.normalize(jsDest),
    filename: '[name].js',
    publicPath: publicPath
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
})
