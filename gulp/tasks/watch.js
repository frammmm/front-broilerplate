const gulp = require("gulp");

gulp.task("watch", [
  "svg:sprite:watch",
  "nunjucks:watch",
  "sass:watch",
  "copy:watch",
  "webpack:watch"
]);
