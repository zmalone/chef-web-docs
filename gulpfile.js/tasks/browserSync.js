if(global.production) return

var path = require('path')
var browserSync = require('browser-sync')
var gulp = require('gulp')
var webpack = require('webpack')
var webpackConfig = require('../lib/webpack.dev')
var config = require('../config')

var browserSyncTask = function() {
  var compiler = webpack(webpackConfig)
  var proxyConfig = config.tasks.browserSync.proxy || null;

  if (typeof(proxyConfig) === 'string') {
    config.tasks.browserSync.proxy = {
      target: proxyConfig
    }
  }

  var server = config.tasks.browserSync.proxy || config.tasks.browserSync.server;

  server.middleware = [
    require('webpack-dev-middleware')(compiler, {
      stats: 'errors-only',
      publicPath: path.join('/', webpackConfig.output.publicPath)
    }),
    require('webpack-hot-middleware')(compiler)
  ]

  browserSync.init(config.tasks.browserSync)
}

gulp.task('browserSync', browserSyncTask)
module.exports = browserSyncTask
