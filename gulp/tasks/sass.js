const config = require('../config'),
    gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    postcss = require('gulp-postcss'),
    purify = require('gulp-purifycss'),
    server = require('browser-sync');

const sortMediaQueries = (a, b) => {
    const isMax = (mq) => /max-width/.test(mq);
    const isMin = (mq) => /min-width/.test(mq);

    let A = a.replace(/\D/g, '');
    let B = b.replace(/\D/g, '');

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
};

const settings = [
    require('css-mqpacker')({
        sort: sortMediaQueries
    }),
    require('postcss-csso')
];

gulp.task('sass', () =>
    gulp
        .src(config.src.styles + '/**/*.{sass,scss}')
        .pipe(sass().on('error', sass.logError))
        .pipe(purify([config.dist.root + '/*.html']))
        .pipe(postcss(settings))
        .pipe(gulp.dest(config.dist.css))
);

gulp.task('sass:dev', () =>
    gulp
        .src(config.src.styles + '/**/*.{sass,scss}')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded',
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.dist.css))
        .pipe(server.reload({
            stream: true
        }))
);

gulp.task('sass:watch', () => {
    gulp.watch(config.src.styles + '/**/*.{sass, scss}', ['sass']);
});



