const gulp = require('gulp'),
      runSequence = require('run-sequence');

gulp.task('default', () => {
  runSequence(
    'build:dev',
    'watch',
    'dev-server'
  );
});