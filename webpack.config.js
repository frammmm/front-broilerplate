const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

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

  entry: {
    bundle: path.resolve(config.src.js, 'app.js')
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
    new FriendlyErrorsWebpackPlugin(),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: isDevelopment ? '[name].css' : '[name].[contenthash].css'
    }),

    ...pages.map(page => new HtmlWebpackPlugin(page)),

    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'async'
    })
  ],

  module: {
    rules: [{
      test: /\.s[ac]ss$/i,
      use: [
        'cache-loader',
        MiniCssExtractPlugin.loader,
        'css-loader',
        'sass-loader'
      ]
    }, {
      test: /\.js$/,
      use: [
        'cache-loader',
        'babel-loader',
        'eslint-loader'
      ]
    }]
  }
};
