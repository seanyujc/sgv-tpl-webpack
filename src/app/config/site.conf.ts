import { Env, IServerConfig } from "../../lib/sg-resource";
import Common from "../core/common";

export const serverConfig: IServerConfig = {
  env: Common.getEnv(),
  debug: false,
  protocol: window.location.protocol,
  publicPath: Common.getPublicPath(),
  successCode: "000000",
  sites: {},
  isMock: true,
};
// 开发、测试、UAT、生产环境配置 remote: 远端API地址，local和appID在微信中调用jsapi使用。
serverConfig.sites = Common.getSiteInfo();

if (!serverConfig.sites) {
  serverConfig.sites = {};
  serverConfig.sites[Env.DEV] = { remote: "172.16.106.110:8080", local: "172.16.106.110:8001", appID: "xxx" };
  serverConfig.sites[Env.TEST] = { remote: "172.16.103.211", local: "dh5.lianbi.com.cn", appID: "xxx" };
  serverConfig.sites[Env.UAT] = { remote: "172.16.103.211", local: "dh5.lianbi.com.cn", appID: "xxx" };
  serverConfig.sites[Env.PRO] = { remote: "172.16.103.211", local: "dh5.lianbi.com.cn", appID: "xxx" };
}
// 如果全局配置了站点信息，则修改uat和生产环境
if (!!(window as any).CONFIG_SITE) {
  serverConfig.sites[Env.UAT].local = (window as any).CONFIG_SITE;
  serverConfig.sites[Env.PRO].local = (window as any).CONFIG_SITE;
}
if (!!(window as any).CONFIG_REMOTE) {
  serverConfig.sites[Env.UAT].remote = (window as any).CONFIG_REMOTE;
  serverConfig.sites[Env.PRO].remote = (window as any).CONFIG_REMOTE;
}
