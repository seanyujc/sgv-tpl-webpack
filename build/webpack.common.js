const path = require('path');
var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var config = require('./config');
var vuxLoader = require('vux-loader');
var NODE_ENV = process.env.NODE_ENV || 'DEV'

const appExtractScss = new ExtractTextPlugin('styles/common_[contenthash:8].css');
const compExtractScss = new ExtractTextPlugin('styles/comp_[contenthash:8].css');

let webpackConfig = {
  context: path.resolve(__dirname, "../"),
  entry: {
    app: path.resolve(__dirname, '../src/app', 'index.bootstrap.ts')
  },
  output: {
    filename: 'scripts/[name]_[hash].js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [{
        test: /.tsx?$/,
        include: [
          path.resolve(__dirname, '../src')
        ],
        exclude: [
          path.resolve(__dirname, '../node_modules'),
          path.resolve(__dirname, '../bower_components')
        ],
        use: [{
          loader: 'awesome-typescript-loader',
          options: {
            useBabel: true,
            useCache: true,
            // babelOptions: {
            //   babelrc: false,
            //   "presets": [
            //     ["es2015", { "targets": "last 2 versions, ie 11", "modules": false }]
            // ]
            // }
          }
        }]
      },
      {
        test: /\.scss$/,
        use: appExtractScss.extract({
          fallback: 'style-loader',
          //如果需要，可以在 sass-loader 之前将 resolve-url-loader 链接进来
          use: [{
            loader: 'css-loader',
            options: {
              localIdentName: '[local]'
            }
          }, 'sass-loader']
        })
        // use: ExtractTextPlugin.extract([
        //   'style-loader',
        //   {
        //     loader: 'css-loader',
        //     options: {
        //       // modules: true,
        //       localIdentName: '[local]',
        //     }
        //   },
        //   'sass-loader'
        // ])
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          'url-loader?name=styles/images/[name]_[hash].[ext]&limit=500'
        ]
      },
      {
        test: /\.vue$/,
        use: [{
          loader: 'vue-loader',
          options: {
            loaders: {
              ts: [{
                loader: 'awesome-typescript-loader',
                options: {
                  useBabel: true,
                  useCache: true,
                }
              }],
              // scss: ['style-loader', {
              //   loader: 'css-loader',
              //   options: {
              //     localIdentName: '[local]'
              //   }
              // }, 'sass-loader'],
              scss: compExtractScss.extract({
                fallback: 'style-loader',
                //如果需要，可以在 sass-loader 之前将 resolve-url-loader 链接进来
                use: [{
                  loader: 'css-loader',
                  options: {
                    localIdentName: '[local]'
                  }
                }, 'sass-loader']
              })
            },
            esModule: true
          }
        }]
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx', '.scss', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.js',
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/app/index.html'),
      styles: ['styles/bootstrap'],
      lib: [
        'dll/main',
        'dll/lib',
      ],
      NODE_ENV,
      siteInfo: config.siteInfo,
    }),
    new webpack.DllReferencePlugin({
      context: path.resolve(__dirname, '..'),
      manifest: require(path.resolve(__dirname, '../dll/main-manifest.json'))
    }),
    new webpack.DllReferencePlugin({
      context: path.resolve(__dirname, '..'),
      manifest: require(path.resolve(__dirname, '../dll/lib-manifest.json'))
    }),
    appExtractScss,
    compExtractScss,
  ]
  // devServer: {
  //   hot: true,
  //   contentBase: path.join(__dirname, "dist"),
  //   publicPath: path.join('/'),
  //   host: "0.0.0.0",
  // }
};
webpackConfig = vuxLoader.merge(webpackConfig, {
  plugins: ['vux-ui', 'inline-manifest',
    {
      name: 'less-theme',
      path: 'src/app/styles/theme.less'
    }
  ]
})
// console.log(JSON.stringify(webpackConfig));
module.exports = webpackConfig;