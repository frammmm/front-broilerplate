const gulp = require("gulp");

gulp.task("watch", [
  "svg:sprite:watch",
  "nunjucks:watch",
  "css:watch",
  "copy:watch",
  "webpack:watch"
]);
