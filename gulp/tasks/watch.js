const gulp = require('gulp');

gulp.task('watch', [
    'sass:watch',
    'copy:watch',
    'webpack:watch',
    'pages:watch'
]);