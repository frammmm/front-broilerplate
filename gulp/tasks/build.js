const gulp = require('gulp'),
      runSequence = require('run-sequence');

gulp.task('build', (cb) => {
  runSequence(
    'clean',
    'pages',
    ['sass', 'copy', 'webpack'],
    cb
  );
});

gulp.task('build:dev', (cb) => {
  runSequence(
    'clean',
    'pages',
    ['sass', 'copy'],
    cb
  );
});