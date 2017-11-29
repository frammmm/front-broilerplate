const srcPath = 'src',
      destPath = 'dest';

const config = {
  src: {
    root: srcPath,
    styles: srcPath + '/styles',
    js: srcPath + '/js',
    img: srcPath + '/img',
    fonts: srcPath + '/fonts'
  },
  dest: {
    root: destPath,
    html: destPath,
    css: destPath + '/css',
    js: destPath + '/js',
    img: destPath + '/img',
    fonts: destPath + '/fonts',
  }
}

module.exports = config;