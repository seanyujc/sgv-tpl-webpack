const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const config = require('./config');
const common = require('./webpack.common.js');
module.exports = merge(common, {
  output: {
    publicPath: config.dev.assetsPublicPath
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, "../dist"),
    compress: true,
    port: config.dev.port,
    host: "0.0.0.0",
  },
  plugins: [
    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify('DEV'),
      'PUBLIC_PATH': JSON.stringify(config.dev.assetsPublicPath),
      'SITE_INFO': JSON.stringify(config.siteInfo)
    }),
  ]
})
