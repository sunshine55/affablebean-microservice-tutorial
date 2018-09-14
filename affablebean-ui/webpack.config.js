const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const SOURCE_PATH = path.resolve(__dirname, './src/main/resources');

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
            category: `${SOURCE_PATH}/js/category/index.js`
        },
        output: {
            path: `${SOURCE_PATH}/static/bundle`,
            filename: '[name].bundle.js',
            sourceMapFilename: '[name].map.js'
        },
        module: {
            rules: rules
        },
        plugins: [
            new ExtractTextPlugin('[name].bundle.css')
        ]
    };
};