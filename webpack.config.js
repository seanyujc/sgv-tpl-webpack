const path = require("path");
const webpack = require("webpack");
const { CheckerPlugin } = require("awesome-typescript-loader");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 读取配置文件
const fs = require("fs");
require(path.resolve(__dirname, "config/site.config.js"));
const SITE_INFO = __sg_site_config__;

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = "development";
}

const publicPath =
  process.env.NODE_ENV === "development" ? "/" : "/call_center/";

// fs.writeFileSync(
//   path.resolve(__dirname, "dist/config/site.json"),
//   JSON.stringify(SITE_INFO),
// );

console.log(process.env.NODE_ENV, SITE_INFO.runtimes);

const webpackConfig = {
  mode: process.env.NODE_ENV,
  entry: {
    app: "./src/app/index.bootstrap.ts",
    // user: "./src/user/index.bootstrap.ts",
  },
  output: {
    filename: "scripts/[name]_[hash].js",
    path: path.resolve(__dirname, "dist"),
    publicPath,
  },
  resolve: {
    extensions: [".vue", ".ts", ".tsx", ".js", ".jsx"],
    alias: {
      vue:
        process.env.NODE_ENV !== "production"
          ? "vue/dist/vue.js"
          : "vue/dist/vue.min.js",
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "awesome-typescript-loader",
            options: {
              // useBabel: true,
              // useCache: true,
              // babelCore: "@babel/core",
            },
          },
        ],
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: "vue-loader",
            options: {},
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          process.env.NODE_ENV !== "production"
            ? "vue-style-loader"
            : MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              publicPath: publicPath + "images/",
              outputPath: "images/",
            },
          },
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[hash].[ext]",
              publicPath: publicPath + "styles/",
              outputPath: "styles/",
            },
          },
        ],
      },
      {
        test: /\.(json)$/,
        type: "javascript/auto",
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              publicPath: publicPath + "config/",
              outputPath: "config/",
            },
          },
        ],
      },
    ],
  },
  devServer: {
    historyApiFallback: {
      rewrites: [
        {
          from: /^\/$/,
          to: "/index.html",
        },
      ],
      disableDotRule: true,
    },
    host: "0.0.0.0",
    hot: true,
    port: 8080,
    publicPath,
    contentBase: path.resolve(__dirname, "dist"),
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "initial",
          minChunks: 2,
        },
      },
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin({
      // Options...
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/app/index.html"),
      filename: "index.html",
      chunks: ["app", "vendors"],
      SITE_INFO,
      publicPath: publicPath,
      favicon: path.resolve(__dirname, "src/app/favicon.png"),
    }),
    new CheckerPlugin(),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: "styles/[name]_[hash].css",
    }),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      PUBLIC_PATH: JSON.stringify(publicPath),
      SITE_INFO: JSON.stringify(SITE_INFO),
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
  ],
};

module.exports = (env, argv) => {
  if (process.env.NODE_ENV === "development") {
    webpackConfig.devtool = "inline-source-map";
  }

  if (process.env.NODE_ENV === "production") {
  }

  return webpackConfig;
};
