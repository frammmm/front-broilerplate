const gulp = require('gulp'),
      config = require('../config'),
      server = require('browser-sync');

gulp.task('pages', () => {
  return gulp
    .src(config.src.root + '/*.html')
    .pipe(gulp.dest(config.dest.root))
    .pipe(server.reload({stream: true}));
})

gulp.task('pages:watch', () => {
  gulp.watch(config.src.root + '/*.html', ['pages']);
});