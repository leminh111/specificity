var gulp = require('gulp'),
 connect = require('gulp-connect'),
    less = require('gulp-less');

gulp.task('webserver', function() {
  connect.server({
    livereload: true,
    root: 'src'
  });
});

gulp.task('livereload', function() {
    gulp.src('./src/theme/css/*.css').pipe(connect.reload());
    gulp.src('./src/index.html').pipe(connect.reload());
});

gulp.task('less', function() {
    return gulp.src('./src/theme/less/main.less')
    .pipe(less())
    .pipe(gulp.dest('./src/theme/css'));
});

gulp.task('watch', function() {
    gulp.watch('./src/theme/less/*.less', ['less']);
    gulp.watch(['./src/theme/css/*.css', './src/index.html'], ['livereload']);
});

gulp.task('default', ['less', 'webserver', 'livereload', 'watch']);
