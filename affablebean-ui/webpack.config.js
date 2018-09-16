const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const SOURCE_PATH = './src/main/resources';
const VIEW_PATH = path.resolve(__dirname, `${SOURCE_PATH}/js`);
const LIB_PATH = path.resolve(__dirname, `${SOURCE_PATH}/lib`);
const BUILD_PATH = path.resolve(__dirname, `${SOURCE_PATH}/static/bundle`);

const rules = [{
    test: /\.(js|jsx)$/,
    loader: 'babel-loader',
    options: {
        presets: ['es2015', 'react']
    },
    exclude: /node_modules/
}, {
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader'
    })
}, {
    test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
    loader: 'url-loader',
    options: {
        limit: 10000
    }
}];

module.exports = (env) => {
    if (env.NODE_ENV === 'prod') {
        console.log('Push new config for prod...');
    }
    return {
        entry: {
            category: `${VIEW_PATH}/category/index.js`,
            vendor: ['babel-polyfill', `${LIB_PATH}/vendor.js`]
        },
        output: {
            path: BUILD_PATH,
            filename: '[name].bundle.js',
            sourceMapFilename: '[name].map.js'
        },
        module: {
            rules: rules
        },
        plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery'
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor'
            }),
            new ExtractTextPlugin('[name].bundle.css')
        ]
    };
};