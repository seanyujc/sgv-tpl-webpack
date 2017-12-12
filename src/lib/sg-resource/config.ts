/**
 * 环境枚举
 */
export const enum Env {
  DEV = 1,
  TEST,
  UAT,
  PRO,
}

/**
 * 站点信息
 */
export interface ISite {
  local: string;
  remote: string;
  appID?: string;
}

/**
 * 主机信息
 */
export interface IHost {
  domain?: string;
  dir: string;
}

/**
 * 主机、站点集合对象
 */
export declare interface IHosts { [key: string]: IHost; }
export declare interface ISites { [key: string]: ISite; }

/**
 * 接口配置对象
 */
export interface IApiConfig {
  [key: string]: any;
  hosts: IHosts;
  post: { [key: string]: string };
  get: { [key: string]: string };
  serviceFactory: any;
}

/**
 * 模拟数据
 */
export interface IMockData {
  [key: string]: any;
  post: { [key: string]: any };
  get: { [key: string]: any };
}

/**
 * 服务器配置对象
 */
export interface IServerConfig {
  env: Env;
  debug: boolean;
  protocol: string;
  publicPath: string;
  sites: ISites | void;
  successCode: string;
  successCallback?: <T>(res: T, resolve: T | PromiseLike<T> | undefined, reject: any) => void;
  failCallback?: <T>(res: T, reject: any) => void;
  isMock?: boolean;
  wXJsSign?: string;
  wXOAuth?: string;
  jsApiList?: string[];
}

export interface IConfigAdapter {
  readonly env: Env;
  readonly debug: boolean;
  readonly protocol: string;
  readonly hosts: IHosts;
  readonly serviceFactory: any;
  readonly successCode: string;
  readonly isMock?: boolean;
  readonly mockData: IMockData;
  readonly curSite: ISite;
  readonly domain: string;
  readonly localSite: string;
  readonly entrance: string;
  readonly jsSignUrl?: string;
  readonly jsApiList?: string[];

  getApi(method: string, apiName: string): string;
}

export interface IConfigAdapterConstructor {
  new(apiConfig: IApiConfig, serverConfig: IServerConfig, mockData: IMockData): IConfigAdapter;
}

export function createConfigAdapter(
  ctor: IConfigAdapterConstructor, apiConfig: IApiConfig, serverConfig: IServerConfig,
  mockData: IMockData) {
  return new ctor(apiConfig, serverConfig, mockData);
}

export class ConfigAdapter implements IConfigAdapter {

  env: Env;
  debug: boolean;
  protocol: string;
  hosts: IHosts;
  successCode: string;
  isMock?: boolean;
  mockData: IMockData;
  curSite: ISite;
  domain: string;
  localSite: string;
  entrance: string;
  serviceFactory: any;
  jsSignUrl?: string;
  jsApiList?: string[] | undefined;

  private URL_TPL = "//{DOMAIN}{HOST_API}?appId=APPID&path=PATH&state=!STATE";

  constructor(private apiConfig: IApiConfig, private serverConfig: IServerConfig, mockData: IMockData) {
    this.env = serverConfig.env;
    this.debug = serverConfig.debug;
    this.protocol = serverConfig.protocol;
    this.hosts = apiConfig.hosts;
    this.serviceFactory = apiConfig.serviceFactory;
    this.successCode = serverConfig.successCode;
    this.isMock = serverConfig.isMock;
    this.mockData = mockData;
    this.curSite = !!serverConfig.sites ? serverConfig.sites[this.env] : { local: window.location.host, remote: window.location.host };
    this.domain = this.curSite.remote;
    this.localSite = this.protocol + "//" + this.curSite.local + serverConfig.publicPath;
    this.entrance = !!serverConfig.wXOAuth && !!this.curSite.appID ?
      this.protocol + this.URL_TPL.replace(/\{DOMAIN}/, this.curSite.remote).replace(/\{HOST_API}/, serverConfig.wXOAuth)
        .replace("APPID", this.curSite.appID) : "";
    this.jsSignUrl = !!serverConfig.wXJsSign ? "//" + this.curSite.remote + serverConfig.wXJsSign : undefined;
    this.jsApiList = serverConfig.jsApiList;
  }

  getApi(method: string, apiName: string): string {
    if (this.apiConfig[method] && this.apiConfig[method][apiName]) {
      return this.apiConfig[method][apiName];
    }
    return "";
  }
}
