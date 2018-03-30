// tslint:disable-next-line:no-var-requires
const MockAdapter = require("axios-mock-adapter");
import Axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import * as qs from "qs";
import { ICommon } from "./common";
import { IConfigAdapter, IMockData } from "./config";
import { SGVFactory } from "./factory";

export interface IProxyHttp {
  /**
   * 代理get请求
   * @param api config定义的接口名
   * @param params 请求参数
   */
  get<T, K>(api: string, params: K): Promise<T>;
  /**
   * 代理post请求
   * @param api config定义的接口
   * @param params 请求参数
   */
  post<T, K>(api: string, params: K, config?: AxiosRequestConfig | undefined): Promise<T>;
  form<T>(api: string, form: FormData): Promise<T>;
}

export interface IProxyHttpConstructor {
  new(): IProxyHttp;
}

export function createProxyHttp(ctor: IProxyHttpConstructor): IProxyHttp {
  return new ctor();
}

export class ProxyHttp implements IProxyHttp {

  private configAdapter: IConfigAdapter;

  private common: ICommon;
  constructor() {
    this.common = SGVFactory.createCommon();
    this.configAdapter = SGVFactory.createConfigAdapter();
    if (!!this.configAdapter.isMock) {
      this.addMockData(this.configAdapter.mockData);
    }
  }

  public get<T, K>(api: string, params: K): Promise<T> {
    const url = this.common.dealPath(api, "GET");
    return Axios.get(url, { params })
      .then<T>(this.fulfilled);
  }
  public post<T, K>(api: string, data: K, config?: AxiosRequestConfig | undefined): Promise<T> {
    const url = this.common.dealPath(api, "POST");
    if (!config) {
      config = { headers: { "Content-Type": "application/x-www-form-urlencoded" } };
    }
    if (config && !config.headers) {
      config.headers = { "Content-Type": "application/x-www-form-urlencoded" };
    }
    config.headers["Content-Type"] = "application/x-www-form-urlencoded";
    return Axios.post(url, qs.stringify(data), config).then<T>(this.fulfilled);
  }
  public form<T>(api: string, form: FormData): Promise<T> {
    const url = this.common.dealPath(api, "POST");
    return Axios.post(url, form,
      {
        headers: { "Content-Type": undefined },
      }).then<T>(this.fulfilled);
  }

  private fulfilled = <T>(res: AxiosResponse) => {
    const promise = new Promise<T>((resolve, reject) => {
      if (res.data.hasOwnProperty("code") && String(res.data.code) === this.configAdapter.successCode) {
        resolve(res.data.data);
      } else {
        reject(res.data);
      }
    });
    return promise;
  }

  private addMockData(mockData: IMockData): void {
    const mock = new MockAdapter(Axios);
    for (const key in mockData.get) {
      if (mockData.get.hasOwnProperty(key)) {
        const url = this.common.dealPath(key, "GET");
        mock.onGet(url).reply(200, mockData.get[key]);
      }
    }
    for (const key in mockData.post) {
      if (mockData.post.hasOwnProperty(key)) {
        const url = this.common.dealPath(key, "POST");
        if (typeof mockData.post[key] === "function") {
          mock.onPost(url).reply(mockData.post[key]);
        } else {
          mock.onPost(url).reply(200, mockData.post[key]);
        }
      }
    }
    mock.onPost().reply(404);
  }
}
