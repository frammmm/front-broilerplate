const gulp = require('gulp'),
    del = require('del'),
    config = require('../config');

gulp.task('clean', () => {
    return del(config.dist.root + '/**/*.*');
});