const fs = require('fs');
const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

const config = require('./scripts/config');

const mode = process.env.NODE_ENV;
const isDevelopment = mode === 'development';

const pages = fs.readdirSync(config.src.pages)
  .map(file => ({
    filename: file,
    template: `${config.src.pages}/${file}`
  }));

module.exports = {
  devServer: {
    quiet: true
  },

  mode,

  optimization: {
    runtimeChunk: {
      name: 'runtime'
    }
  },

  entry: {
    bundle: path.resolve(config.src.js, 'index.ts')
  },

  output: {
    path: path.join(__dirname, config.distPath),
    filename: isDevelopment ? '[name].js' : '[name].[contenthash].js'
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },

  plugins: [
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: ['You application is running here http://localhost:8080'],
      }
    }),
    new CleanWebpackPlugin(),

    ...pages.map(page => new HtmlWebpackPlugin(page)),

    new MiniCssExtractPlugin({
      filename: isDevelopment ? '[name].css' : '[contenthash].css',
      chunkFilename: isDevelopment ? '[name].css' : '[contenthash].chunk.css'
    }),

    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'async'
    })
  ],

  module: {
    rules: [{
      test: /\.[tj]s$/,
      use: [
        'cache-loader',
        'swc-loader',
        'eslint-loader'
      ]
    }, {
      test: /\.s[ac]ss$/i,
      use: [
        MiniCssExtractPlugin.loader,
        'cache-loader',
        'css-loader',
        'sass-loader'
      ]
    }]
  }
};
