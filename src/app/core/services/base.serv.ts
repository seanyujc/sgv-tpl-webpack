import { IProxyHttp, SGVFactory } from "../../../lib/sg-resource";

export class BaseService {

  proxyHttp: IProxyHttp;
  
  constructor() {
    this.proxyHttp = SGVFactory.createProxyHttp();;
  }

}