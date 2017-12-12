import { IProxyHttp, SGVFactory } from "../../../lib/sg-resource";
import { Services } from "../factory.serv";

export class BaseService {

  proxyHttp: IProxyHttp;
  
  constructor() {
    this.proxyHttp = SGVFactory.createProxyHttp();;
  }

}