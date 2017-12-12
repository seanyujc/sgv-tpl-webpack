import { Common, createCommon, ICommon, ICommonConstructor } from "./common";
import { ConfigAdapter, createConfigAdapter, IMockData } from "./config";
import { IApiConfig, IConfigAdapter, IServerConfig, ProxyHttp } from "./index";
import { createProxyHttp, IProxyHttp } from "./proxyHttp";

export abstract class SGVFactory {
  static common: ICommon;
  static proxyHttp: IProxyHttp;
  static configAdapter: IConfigAdapter;

  /**
   * 谁使用谁传参创建
   * @param apiConfig api配置
   * @param serverConfig 服务器配置
   * @param mockData 模拟数据配置
   */
  static createConfigAdapter(apiConfig?: IApiConfig, serverConfig?: IServerConfig, mockData?: IMockData) {
    if (!this.configAdapter) {
      if (!!apiConfig && !!serverConfig && !!mockData) {
        this.configAdapter = createConfigAdapter(ConfigAdapter, apiConfig, serverConfig, mockData);
      } else {
        throw new Error("config init fail!!");
      }
    }
    return this.configAdapter;
  }

  static createProxyHttp(): IProxyHttp {
    if (!this.proxyHttp) {
      this.proxyHttp = createProxyHttp(ProxyHttp);
    }
    return this.proxyHttp;
  }

  static createCommon() {
    if (!this.common) {
      this.common = createCommon(Common);
    }
    return this.common;
  }

}
