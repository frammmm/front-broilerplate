const gulp = require('gulp'),
    server = require('browser-sync'),
    config = require('../config');

gulp.task('dev-server', () => {
    server.init({
        server: {
            baseDir: config.dist.root
        },
        notify: false,
        open: false
    })
});

module.exports = server;