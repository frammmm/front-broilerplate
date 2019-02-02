const gulp = require("gulp");
const runSequence = require("run-sequence");

gulp.task("build", cb => {
  runSequence("clean", ["svg:sprite", "nunjucks"], ["sass", "copy", "webpack"], cb);
});

gulp.task("build:dev", cb => {
  runSequence("clean", ["svg:sprite", "nunjucks"], ["sass:dev", "copy"], cb);
});
