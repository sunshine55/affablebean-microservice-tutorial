const path = require('path');

const BUILD_DIR = path.resolve(__dirname, './build');
const SOURCE_DIR = path.resolve(__dirname, './src');

const rules = [{
  test: /\.(js|jsx)$/,
  loader: 'babel-loader',
  exclude: /node_modules/
}, {
  test: /\.css$/i,
  use: ['style-loader', 'css-loader']
}];

module.exports = {
  entry: {
    main: [`${SOURCE_DIR}/App.js`],
    roboto: [`${SOURCE_DIR}/styles/roboto.js`]
  },
  module: {
    rules
  },
  output: {
    path: BUILD_DIR,
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map.js',
    clean: true
  }
};
