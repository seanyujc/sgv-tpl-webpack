const path = require('path');
var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var config = require('./build/config')

var NODE_ENV = process.env.NODE_ENV || 'DEV'

module.exports = {
	entry: path.join(__dirname, 'src/app', 'index.bootstrap.ts'),
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [{
			test: /.tsx?$/,
			include: [
				path.resolve(__dirname, 'src')
			],
			exclude: [
				path.resolve(__dirname, 'node_modules'),
				path.resolve(__dirname, 'bower_components')
			],
			use: [{
				loader: 'awesome-typescript-loader',
				options: {
					useBabel: true,
					useCache: true
				}
			}]
    },
    {
      test: /\.scss$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            // modules: true,
            localIdentName: '[local]',
          }
        },
        'sass-loader']
    },
    {
      test: /\.html$/,
      use: [
        'raw-loader'
      ]
    },]
	},
	resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx', '.scss'],
    alias: {
      'vue': 'vue/dist/vue.js'
    }
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'src/app/index.html')
    }),
    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify(NODE_ENV),
      'PUBLIC_PATH': JSON.stringify(config.dev.assetsPublicPath),
      'SITE_INFO': JSON.stringify(config.build.siteInfo)
    })
	],
	devtool: 'source-map',
	devServer: {
		publicPath: path.join('/')
	}
};
