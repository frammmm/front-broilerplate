const gulp = require('gulp');
const svgSprite = require('gulp-svg-sprite');
const svgMin = require('gulp-svgmin');
const cheerio = require('gulp-cheerio');
const replace = require('gulp-replace');
const config = require('../config');
const bs = require('./dev-server');

gulp.task('svg:sprite', () => {
  return gulp
    .src(config.src.icons + '/*.svg')
    .pipe(
      svgMin({
        js2svg: {
          pretty: true
        }
      })
    )
    .pipe(
      cheerio({
        run: function ($) {
          $('[fill]').removeAttr('fill');
          $('[stroke]').removeAttr('stroke');
          $('[style]').removeAttr('style');
        },
        parserOptions: { xmlMode: true }
      })
    )
    .pipe(replace('&gt;', '>'))
    .pipe(
      svgSprite({
        mode: {
          symbol: {
            sprite: '../sprite.svg',
            render: {
              styl: {
                dest: '../../../' + config.src.styles + '/icons',
                template: config.src.styles + '/utils/_svg-template.styl'
              }
            }
          }
        }
      })
    )
    .pipe(gulp.dest(config.dist.img));
});

gulp.task('svg:sprite:watch', () => {
  bs.watch(config.src.icons + '/**/*.svg', { ignoreInitial: true }, () => {
    gulp.start('svg:sprite');
  });
});
