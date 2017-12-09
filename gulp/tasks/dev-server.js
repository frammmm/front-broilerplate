const gulp = require('gulp'),
    bs = require('browser-sync').create(),
    config = require('../config');

gulp.task('dev-server', () => {

    bs.init({
        server: {
            baseDir: config.dist.root
        },
        notify: false,
        open: false
    });

});

module.exports = bs;