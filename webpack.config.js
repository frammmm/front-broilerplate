const webpack = require('webpack'),
    path = require('path'),
    config = require('./gulp/config'),
    BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const NODE_ENV = process.env.NODE_ENV;

function createConfig() {
    let isProduction = NODE_ENV === 'production';

    let webpackConfig = {
        context: path.join(__dirname, config.src.js),
        entry: {
            app: './app.js'
        },
        output: {
            path: path.join(__dirname, config.dist.js),
            filename: '[name].js',
            publicPath: 'js/'
        },
        devtool: isProduction ? '#source-map' : '#cheap-module-eval-source-map',
        plugins: [
            new webpack.DefinePlugin({
                "process.env": {
                    NODE_ENV: JSON.stringify(NODE_ENV)
                }
            }),
            new webpack.NoEmitOnErrorsPlugin()
        ],
        module: {
            rules: [{
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: [
                    path.resolve(__dirname, "node_modules")
                ],
                query: {
                    presets: ['env']
                }
            }]
        }
    };

    if (!isProduction) {
        webpackConfig.plugins.push(
            new BundleAnalyzerPlugin({
                analyzerMode: 'static',
                analyzerPort: 4000,
                openAnalyzer: false
            })
        )
    } else {
        webpackConfig.plugins.push(
            new webpack.LoaderOptionsPlugin({
                minimize: true
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                },
                parallel: true
            })
        );
    }

    return webpackConfig;
}

module.exports = createConfig();
module.exports.createConfig = createConfig;