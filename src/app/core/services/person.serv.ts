import { BaseService } from "./base.serv";

export interface IPersonService {
  // SGV-BUILD-SERVICE-INTERFACE # NOT DELETE
  fetchRecords(arg: string): Promise<any>;
  getUserInfo(arg: any, a: string): Promise<any>;
}

interface IPersonServiceConstructor {
  new(): IPersonService;
}

export function createPersonService(ctor: IPersonServiceConstructor): IPersonService {
  return new ctor();
}

export class PersonService extends BaseService implements IPersonService {
  constructor() {
    super();
  }
  // SGV-BUILD-SERVICE-FUNCTION # NOT DELETE
  public fetchRecords(arg: string): Promise<any> {
    return this.proxyHttp.post("fetchRecords", {arg});
  }
  public getUserInfo(arg: any): Promise<any> {
    return this.proxyHttp.post("getUserInfo", {arg});
  }
}
