let gulp = require('gulp'),
    server = require('browser-sync'),
    config = require('../config');

gulp.task('dev-server', () => {
  server.init({
    server: {
      baseDir: config.dest.root
    },
    notify: false,
    open: false
  })
});

module.exports = server;