const merge = require('webpack-merge');
const webpack = require('webpack');
const config = require('./config');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');

var NODE_ENV = process.env.NODE_ENV || 'PROD'

module.exports = merge(common, {
  output: {
    publicPath: config.bundle.assetsPublicPath
  },
  resolve: {
    alias: {
			'vue$': 'vue/dist/vue.min.js'
		}
  },
	plugins: [
		new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify(NODE_ENV),
      'PUBLIC_PATH': JSON.stringify(config.bundle.assetsPublicPath),
      'SITE_INFO': JSON.stringify(config.siteInfo)
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
	]
});
