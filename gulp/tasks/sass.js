const config = require('../config')
      gulp = require('gulp'),
      sass = require('gulp-sass'),
      gulpif = require('gulp-if'),
      sourcemaps = require('gulp-sourcemaps'),
      postcss = require('gulp-postcss'),
      purify = require('gulp-purifycss'),
      server = require('browser-sync');

const sortMediaQueries = (a, b) => {
  const isMax = (mq) => /max-width/.test(mq);
  const isMin = (mq) => /min-width/.test(mq);

  A = a.replace(/\D/g, '');
  B = b.replace(/\D/g, '');

  if (isMax(a) && isMax(b)) {
    return B - A;
  } else if (isMin(a) && isMin(b)) {
    return A - B;
  } else if (isMax(a) && isMin(b)) {
    return 1;
  } else if (isMin(a) && isMax(b)) {
    return -1;
  }

  return 1;
}

const settings = [
  require('css-mqpacker')({
    sort: sortMediaQueries
  }),
  require('postcss-csso')
]

gulp.task('sass', () => gulp
  .src(config.src.styles + '/**/*.{sass,scss}')
  .pipe(gulpif(process.env.NODE_ENV !== 'production', sourcemaps.init()))
  .pipe(sass({
    outputStyle: 'expanded',
  }).on('error', sass.logError))
  .pipe(gulpif(process.env.NODE_ENV === 'production', purify([config.dest.root + '/*.html'])))
  .pipe(gulpif(process.env.NODE_ENV === 'production', postcss(settings)))
  .pipe(gulpif(process.env.NODE_ENV !== 'production', sourcemaps.write('./')))
  .pipe(gulp.dest(config.dest.css))
  .pipe(gulpif(process.env.NODE_ENV !== 'production', server.reload({stream: true})))
)

gulp.task('sass:watch', () => {
  gulp.watch(config.src.styles + '/**/*.{sass, scss}', ['sass']);
})



