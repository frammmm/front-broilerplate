const gulp = require("gulp");
const bs = require("browser-sync").create();
const config = require("../config");

gulp.task("dev-server", () => {
  bs.init({
    server: {
      baseDir: config.dist.root
    },
    notify: false,
    open: false
  });
});

module.exports = bs;
