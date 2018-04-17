var path = require('path')
var webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  context: path.resolve(__dirname, "../"),
  entry: {
    main: [
      'vue/dist/vue.min.js',
    ],
    lib: [
      // path.resolve(__dirname, '../src/lib/iscroll'),
      path.resolve(__dirname, '../src/lib/sg-resource'),
      'vue-router',
      'vuex',
      'vee-validate',
      'moment',
    ],
    // styles: ['bootstrap-loader'],
  },
  output: {
    path: path.resolve(__dirname, '../dll/dll/'),
    filename: '[name]-dll.js',
    library: '[name]_lib'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.ts', '.scss'],
    modules: [path.resolve(__dirname, '../node_modules')],
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(__dirname, '../dll/[name]-manifest.json'),
      name: '[name]_lib'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'main',
      minChunks: 2,
    }),
    new ExtractTextPlugin('../styles/bootstrap.css'),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,      
      compress: {
        warnings: false
      }
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
  ],
  module: {
    rules: [{
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader?outputStyle=expanded&includePaths[]=' + (path.resolve(__dirname, "../node_modules"))]
        })
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [{
          loader: 'file-loader?name=../assets/fonts/[name].[ext]'
        }]
      }
    ]
  }
}