const path = require('path');

const BUILD_DIR = path.resolve(__dirname, './build');
const LIB_DIR = path.resolve(__dirname, './lib');
const SOURCE_DIR = path.resolve(__dirname, './src');

const rules = [{
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader'
  }
}, {
  test: /\.css$/i,
  use: ["style-loader", "css-loader"]
}, {
  test: /\.(png|jp(e*)g|svg|gif)$/,
  use: ['file-loader']
}];

module.exports = {
  entry: {
    gui_store: [`${SOURCE_DIR}/App.js`]
  },
  output: {
    path: BUILD_DIR,
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map.js',
    clean: true
  },
  modules: {
    rules
  }
};