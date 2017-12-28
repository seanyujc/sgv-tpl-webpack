import { IConfigAdapter, IProxyHttp, SGVFactory } from "../../../lib/sg-resource";

export class BaseService {

  protected proxyHttp: IProxyHttp;
  protected configAdapter: IConfigAdapter;

  constructor() {
    this.proxyHttp = SGVFactory.createProxyHttp();
    this.configAdapter = SGVFactory.createConfigAdapter();
  }

}
