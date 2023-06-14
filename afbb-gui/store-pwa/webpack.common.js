const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'build');
const SOURCE_DIR = path.resolve(__dirname, 'src');

const rules = [{
  test: /\.(js|jsx)$/,
  loader: 'babel-loader',
  exclude: /node_modules/
}];

module.exports = {
  entry: {
    main: [`${SOURCE_DIR}/App.js`]
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