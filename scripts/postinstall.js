const fs = require('fs');

if (!fs.existsSync('./src/fonts')) fs.mkdirSync('./src/fonts');
if (!fs.existsSync('./src/icons')) fs.mkdirSync('./src/icons');
if (!fs.existsSync('./src/img')) fs.mkdirSync('./src/img');
