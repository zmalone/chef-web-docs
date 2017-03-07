var config = require('../config')
var gulp = require('gulp')
var path = require('path')
var tslint = require('gulp-tslint')

var jsSrc = path.join(config.root.src, config.tasks.js.src)

var tslintTask = function () {
  gulp.src(path.join(jsSrc, '**/*.ts'))
    .pipe(tslint({
      configuration: path.join(config.root.src, 'tslint.json')
    }))
    .pipe(tslint.report({
      emitError: false,
      reportLimit: 0,
      summarizeFailureOutput: false
    }))
}

gulp.task('tslint', tslintTask)
module.exports = tslintTask
