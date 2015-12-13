var gulp = require('gulp'),
    connect = require('gulp-connect'),
    less = require('gulp-less'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer');

gulp.task('browserify', function() {
  var b = browserify({
    entries: './src/view.js',
    debug: true,
    transform: [
      ["babelify", {presets: ['react']}]
      // presets es2015 screw things up (matched undefined)
    ]
  });

  return b.bundle()
          .pipe(source('main.js'))
          .pipe(buffer())
          .pipe(gulp.dest('./src/'));
});

gulp.task('webserver', function() {
  connect.server({
    livereload: true,
    root: 'src'
  });
});

gulp.task('livereload', function() {
    gulp.src('./src/*.html').pipe(connect.reload());
});

gulp.task('less', function() {
    return gulp.src('./src/theme/less/main.less')
    .pipe(less())
    .pipe(gulp.dest('./src/theme/css'));
});

gulp.task('watch', function() {
    gulp.watch('./src/theme/less/*.less', ['less']);
    gulp.watch('./src/index.js', ['browserify']);
    gulp.watch(['./src/theme/css/*.css','./src/main.js', './src/index.html'], ['livereload']);
});

gulp.task('default', ['browserify', 'less', 'webserver', 'watch']);
