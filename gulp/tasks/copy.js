const gulp = require('gulp'),
      config = require('../config');

gulp.task('copy', [
  'copy:images',
  'copy:fonts'
]);

gulp.task('copy:watch', () => {
  gulp.watch(config.src.img + '/*', {
    cwd: './'
  }, ['copy'])
})

gulp.task('copy:images', () => {
  return gulp
    .src(config.src.img + '/**/*.{jpg,png,jpeg,svg,gif}')
    .pipe(gulp.dest(config.dest.img));
});

gulp.task('copy:fonts', () => {
  return gulp
    .src(config.src.fonts + '/*.{ttf,eot,woff,woff2}')
    .pipe(gulp.dest(config.dest.fonts));
});
