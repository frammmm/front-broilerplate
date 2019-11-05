const gulp = require('gulp');
const config = require('../config');
const bs = require('./dev-server');

gulp.task('pages', () =>
  gulp
    .src(config.src.root + '/*.html')
    .pipe(gulp.dest(config.dist.root))
    .pipe(bs.reload({
      stream: true
    }))
);

gulp.task('pages:watch', () => {
  bs.watch(config.src.root + '/*.html', { ignoreInitial: true }, () => {
    gulp.start('pages');
  });
});
