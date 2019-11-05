const webpack = require('webpack');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const config = require('./scripts/config');

const env = process.env.NODE_ENV;

function createConfig() {
  let webpackConfig = {
    mode: env || 'development',
    context: path.join(__dirname, config.src.js),
    entry: {
      app: './app.js'
    },
    output: {
      path: path.join(__dirname, config.dist.js),
      filename: '[name].js',
      publicPath: 'js/',
    },
    plugins: [
      new webpack.NoEmitOnErrorsPlugin(),
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        analyzerPort: 4000,
        openAnalyzer: false
      })
    ],
    module: {
      rules: [{
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: 'pre',
      }, {
        test: /\.js$/,
        loader: 'babel-loader',
      }]
    }
  };

  return webpackConfig;
}

module.exports = createConfig();
module.exports.createConfig = createConfig;
