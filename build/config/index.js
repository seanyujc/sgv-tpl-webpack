const path = require('path')
var NODE_ENV = process.env.NODE_ENV || 'DEV'

const siteInfo = {
	DEV: {
		remote: "172.16.107.96:7081",
		local: "172.16.107.96:7000",
		appID: "xxx",
	},
	TEST: {
		remote: "172.16.107.229",
		local: "172.16.107.229",
		appID: "xxx",
	},
	UAT: {
		remote: "lbnweb.haveoo.com",
		local: "lbnweb.haveoo.com",
	},
	PROD: {
		remote: "lbnweb.xylbn.cn",
		local: "lbnweb.xylbn.cn",
	},
}

const bundle = {
	index: path.resolve(__dirname, '../dist/index.html'),
	assetsRoot: path.resolve(__dirname, '../dist'),
	assetsSubDirectory: 'static',
	assetsPublicPath: '/hybrid/',
	productionSourceMap: true,
	siteInfo
}

const dev = {
	port: 8000,
	autoOpenBrowser: true,
	assetsSubDirectory: '',
	assetsPublicPath: '/',
	cssSourceMap: false,
}

module.exports = {
  siteInfo,
	bundle,
	dev
}
