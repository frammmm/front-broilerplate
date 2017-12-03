const srcPath = 'src',
    distPath = 'dist';

const config = {
    src: {
        root: srcPath,
        styles: srcPath + '/styles',
        js: srcPath + '/js',
        img: srcPath + '/img',
        fonts: srcPath + '/fonts'
    },
    dist: {
        root: distPath,
        html: distPath,
        css: distPath + '/css',
        js: distPath + '/js',
        img: distPath + '/img',
        fonts: distPath + '/fonts',
    }
};

module.exports = config;