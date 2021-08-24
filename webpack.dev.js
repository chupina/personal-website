const path = require("path");
const { merge } = require('webpack-merge')  
const common = require('./webpack.common.js');

 module.exports = merge(common, {
   mode: 'development',
   devtool: 'inline-source-map',
   devServer:{
    contentBase: path.join(__dirname,"dist"),
    port: 8080,
    hot:true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: { '^/api': '' },
      },
    },
  },
 });