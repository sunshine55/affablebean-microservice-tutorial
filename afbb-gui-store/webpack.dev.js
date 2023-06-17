const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    proxy: [{
      context: ['/category'],
      target: 'http://afbb-api:8080'
    }],
    port: 3001
  }
});
