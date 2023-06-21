const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  watchOptions: {
    aggregateTimeout: 500,
    poll: 1000
  },
  devServer: {
    proxy: [{
      context: ['/category'],
      target: 'http://afbb-api:8080'
    }, {
      context: ['/media'],
      target: 'http://afbb-cdn:8000'
    }],
    port: 3001
  }
});
