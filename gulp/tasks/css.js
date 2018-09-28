const config = require("../config");
const log = require("fancy-log");
const gulp = require("gulp");
const stylus = require("gulp-stylus");
const sourcemaps = require("gulp-sourcemaps");
const postcss = require("gulp-postcss");
const purify = require("gulp-purifycss");
const bs = require("./dev-server");

const sortMediaQueries = (a, b) => {
  const isMax = mq => /max-width/.test(mq);
  const isMin = mq => /min-width/.test(mq);

  let A = a.replace(/\D/g, "");
  let B = b.replace(/\D/g, "");

  if (isMax(a) && isMax(b)) {
    return B - A;
  } else if (isMin(a) && isMin(b)) {
    return A - B;
  } else if (isMax(a) && isMin(b)) {
    return 1;
  } else if (isMin(a) && isMax(b)) {
    return -1;
  }

  return 1;
};

const settings = [
  require("css-mqpacker")({
    sort: sortMediaQueries
  }),
  require("postcss-csso")
];

gulp.task("generate-css", () =>
  gulp
  .src(config.src.styles + "/**/index.styl")
  .pipe(stylus({
    compress: false
  }))
  .pipe(purify([config.dist.root + "/*.html"]))
  .pipe(postcss(settings))
  .pipe(gulp.dest(config.dist.css))
);

gulp.task("generate-css:dev", () => {
  gulp
    .src(config.src.styles + "/**/index.styl")
    .pipe(sourcemaps.init())
    .pipe(stylus({
      compress: false
    }).on("error", (e) => log.error(e)))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest(config.dist.css))
    .pipe(bs.reload({
      stream: true
    }));
});

gulp.task("css:watch", () => {
  bs.watch(
    config.src.styles + "/**/*.{styl, styl}", {
      ignoreInitial: true
    },
    () => {
      gulp.start("generate-css:dev");
    }
  );
});