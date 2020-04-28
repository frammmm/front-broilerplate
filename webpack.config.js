const fs = require('fs');
const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
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
    filename: isDevelopment ? '[name].js' : '[name].[contenthash:8].js'
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    extensions: ['.ts', '.js']
  },

  module: {
    rules: [{
      test: /\.jsx?$/,
      use: [
        'cache-loader',
        'babel-loader',
        'eslint-loader'
      ]
    }, {
      test: /\.tsx?$/,
      loader: 'ts-loader',
      options: {
        transpileOnly: true
      }
    }, {
      test: /\.s[ac]ss$/i,
      use: [
        MiniCssExtractPlugin.loader,
        'cache-loader',
        'css-loader',
        'sass-loader'
      ]
    }, {
      test: /\.(png|jpe?g|gif)$/i,
      loader: 'file-loader',
      options: {
        name: '[name].[contenthash:8].[ext]',
      },
    }, {
      test: /\.html$/i,
      loader: 'html-loader'
    }]
  },

  plugins: [
    new ForkTsCheckerWebpackPlugin(),

    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: ['You application is running here http://localhost:8080'],
      }
    }),

    new CleanWebpackPlugin(),

    ...pages.map(page => new HtmlWebpackPlugin(page)),

    new MiniCssExtractPlugin({
      filename: isDevelopment ? '[name].css' : '[name].[contenthash:8].css',
      chunkFilename: isDevelopment ? '[name].css' : '[name].[contenthash:8].css'
    }),

    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'async'
    })
  ],
};
