var config = require('../config')
if (!config.tasks.js) return

var gulp = require('gulp')
var logger = require('../lib/compileLogger')
var webpack = require('webpack')
var webpackConfig = require('../lib/webpack.prod')

var webpackProductionTask = function(callback) {
  webpack(webpackConfig, function(err, stats) {
    logger(err, stats)
    callback()
  })
}

gulp.task('webpack:production', webpackProductionTask)
module.exports = webpackProductionTask
