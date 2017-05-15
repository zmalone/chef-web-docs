var config = require('../config')
var gulp = require('gulp')
var path = require('path')
var stylelint = require('gulp-stylelint')

var cssSrc = path.join(config.root.src, config.tasks.css.src)

var stylelintTask = function () {
  return gulp
    .src(path.join(cssSrc, '**/*.scss'))
    .pipe(stylelint({
      failAfterError: false,
      reporters: [
        {formatter: 'string', console: true}
      ]
    }));
}

gulp.task('stylelint', stylelintTask)
module.exports = stylelintTask
