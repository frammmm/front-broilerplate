const gulp = require("gulp");
const runSequence = require("run-sequence");

gulp.task("build", cb => {
  runSequence("clean", ["svg:sprite", "nunjucks"], ["generate-css", "copy", "webpack"], cb);
});

gulp.task("build:dev", cb => {
  runSequence("clean", ["svg:sprite", "nunjucks"], ["generate-css:dev", "copy"], cb);
});
