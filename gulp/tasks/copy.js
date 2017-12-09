const gulp = require('gulp'),
    config = require('../config'),
    bs = require('./dev-server'),
    path = require('path'),
    del = require('del');

gulp.task('copy', () => {
    copyImages();
    copyFonts();
});

gulp.task('copy:watch', () => {

    bs.watch(config.src.img + '/**/*.*', (event, file) => {
        if (event === 'change' || event === 'add') {
            copyImages();
        } else if (event === 'unlink') {
            removeImage(path.basename(file));
        }

        bs.reload();
    });

});

function removeImage(file) {
    del(path.resolve(config.dist.img, file));
}

function copyImages() {
    gulp.src(config.src.img + '/**/*.{jpg,png,jpeg,svg,gif}')
        .pipe(gulp.dest(config.dist.img));
}

function removeFonts(file) {
    del(path.resolve(config.dist.fonts, file));
}

function copyFonts() {
    gulp
        .src(config.src.fonts + '/*.{ttf,eot,woff,woff2}')
        .pipe(gulp.dest(config.dist.fonts))
}