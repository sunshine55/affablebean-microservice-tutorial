const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');

// TODO: fix IO performance for containers running on Docker for Windows (delay hot reload)
module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
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
