const gulp = require('gulp'),
    clean = require('gulp-clean'),
    config = require('../config');

gulp.task('clean', () => {
    return gulp.src(config.dist.root + '/**/*.*')
        .pipe(clean());
});