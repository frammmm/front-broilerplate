const gulp = require("gulp");
const changed = require("gulp-changed");
const frontMatter = require("gulp-front-matter");
const gulpif = require("gulp-if");
const nunjucksRender = require("gulp-nunjucks-render");

const bs = require("./dev-server");
const config = require("../config");

function renderHtml(_changed) {
  nunjucksRender.nunjucks.configure({
    watch: false,
    trimBlocks: true,
    lstripBlocks: false
  });

  return gulp
    .src([config.src.templates + "/**/[^_]*.html"])
    .pipe(gulpif(_changed, changed(config.dist.html)))
    .pipe(frontMatter({ property: "data" }))
    .pipe(
      nunjucksRender({
        PRODUCTION: process.env.NODE_ENV,
        path: [config.src.templates]
      })
    )
    .pipe(gulp.dest(config.dist.html))
    .pipe(
      bs.reload({
        stream: true
      })
    );
}

gulp.task("nunjucks", function() {
  return renderHtml();
});

gulp.task("nunjucks:changed", function() {
  return renderHtml(true);
});

gulp.task("nunjucks:watch", function() {
  gulp.watch([config.src.templates + "/**/[^_]*.html"], ["nunjucks:changed"]);

  gulp.watch([config.src.templates + "/**/_*.html"], ["nunjucks"]);
});
