const path = require('path')
var NODE_ENV = process.env.NODE_ENV || 'DEV'

const htmlWebpackPluginOption = {
  filename: 'index.html',
  template: path.join(__dirname, '../../src/app', 'index-tpl.htm'),
  basePath: '',
  dlls: ['dll/lib-dll', 'dll/styles-dll'],
  styles: ['styles/bootstrap'],
  NODE_ENV: NODE_ENV,
  siteInfo: {
    DEV: { local: "172.16.106.110:8001", remote: "172.16.106.110:8080" },
    TEST: { local: "bsm.haveoo.com", remote: "bsm.haveoo.com" },
    UAT: { local: "bsm-uat.lincomb.com", remote: "bsm-uat.lincomb.com" },
    PRO: { local: "bsm.lincomb.com", remote: "bsm.lincomb.com" },
  }
}

const build = {
  index: path.resolve(__dirname, '../dist/index.html'),
  assetsRoot: path.resolve(__dirname, '../dist'),
  assetsSubDirectory: 'static',
  assetsPublicPath: '/bsm/',
  productionSourceMap: true,
  htmlWebpackPluginOption,
  siteInfo: htmlWebpackPluginOption.siteInfo
}

const dev = {
  port: 8003,
  autoOpenBrowser: true,
  assetsSubDirectory: '',
  assetsPublicPath: '/',
  cssSourceMap: false,
  htmlWebpackPluginOption
}

build.htmlWebpackPluginOption.basePath = build.assetsPublicPath;
dev.htmlWebpackPluginOption.basePath = dev.assetsPublicPath;

module.exports = {
  build,
  dev
}
