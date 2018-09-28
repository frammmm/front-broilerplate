const gulp = require("gulp");
const fs = require('fs');
const runSequence = require("run-sequence");

gulp.task("init", () => {
  const p = require('../../package.json');

  if (p.init) return;

  if (!fs.existsSync('./src/fonts')) fs.mkdirSync('./src/fonts');
  if (!fs.existsSync('./src/icons')) fs.mkdirSync('./src/icons');
  if (!fs.existsSync('./src/img')) fs.mkdirSync('./src/img');

  p.init = true;

  fs.writeFileSync('./package.json', JSON.stringify(p, null, 2));
});

gulp.task("default", () => {
  runSequence("init", "build:dev", "watch", "dev-server");
});
