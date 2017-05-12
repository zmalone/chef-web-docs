var config      = require('../config')
if (!config.tasks.images) return

var gulp        = require('gulp')
var imagemin    = require('gulp-imagemin')
var path        = require('path')

var paths = {
  src: path.join(config.tasks.images.src, '/**/*.{' + config.tasks.images.extensions + '}'),
  dest: path.join(config.tasks.images.dest)
}

var imagesTask = function() {
  return gulp.src([paths.src])
    .pipe(imagemin({progressive: true})) // Optimize
    .pipe(gulp.dest(paths.dest))
}

gulp.task('images', imagesTask)
module.exports = imagesTask
