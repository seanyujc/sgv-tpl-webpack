var MockAdapter = require('axios-mock-adapter');
import Axios, { AxiosResponse } from "axios";
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
  post<T, K>(api: string, params: K): Promise<T>;
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

  get<T, K>(api: string, params: K): Promise<T> {
    const url = this.common.dealPath(api, "GET");
    return Axios.get(url, { params })
      .then<T>(this.fulfilled);
  }
  post<T, K>(api: string, data: K): Promise<T> {
    const url = this.common.dealPath(api, "POST");
    return Axios.post(url, qs.stringify(data),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }).then<T>(this.fulfilled);
  }
  form<T>(api: string, form: FormData): Promise<T> {
    const url = this.common.dealPath(api, "POST");
    return Axios.post(url, form,
      {
        headers: { "Content-Type": undefined },
      }).then<T>(this.fulfilled);
  }

  private fulfilled = <T>(res: AxiosResponse) => {
    const promise = new Promise<T>((resolve, reject) => {
      if (res.data.hasOwnProperty("code") && String(res.data.code) === this.configAdapter.successCode) {
        resolve(res.data);
      } else {
        reject(res.data);
      }
    });
    return promise;
  }

  private addMockData(mockData: IMockData): void {
    const mock = new MockAdapter(Axios);
    // tslint:disable-next-line:forin
    for (const key in mockData.get) {
      const url = this.common.dealPath(key, "GET");
      mock.onGet(url).reply(200, mockData.get[key]);
    }
    // tslint:disable-next-line:forin
    for (const key in mockData.post) {
      const url = this.common.dealPath(key, "POST");
      mock.onPost(url).reply(200, mockData.post[key]);
    }
    mock.onPost().reply(404);
  }
}
