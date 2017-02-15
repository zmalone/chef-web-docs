var config = require('../config')
if (!config.tasks.js) return
var path = require('path')
var webpack = require('webpack')
var webpackMerge = require('webpack-merge')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var webpackManifest = require('./webpackManifest')
var commonConfig = require('./webpack.common.js')

var jsDest = path.resolve(config.root.dest, config.tasks.js.dest)
var publicPath = path.join(config.tasks.js.dest, '/')

const ENV = process.env.NODE_ENV = process.env.ENV = 'production'

module.exports = webpackMerge(commonConfig, {
  devtool: 'source-map',

  output: {
    path: jsDest,
    publicPath: publicPath,
    filename: '[name]-[hash].js'
  },

  plugins: [
    new webpackManifest(publicPath, config.root.dest),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
      mangle: {
        keep_fnames: true
      }
    }),
    new ExtractTextPlugin('[name].[hash].css'),
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV)
      }
    }),
    new webpack.LoaderOptionsPlugin({
      htmlLoader: {
        minimize: false // workaround for ng2
      }
    })
  ]
})
