import { BaseService } from "./base.serv";

export interface ISystemService {
  // SGV-BUILD-SERVICE-INTERFACE # NOT DELETE
  login(userName: string, password: string): Promise<any>;
}

type ISystemServiceConstructor = new () => ISystemService;

export function createSystemService(
  ctor: ISystemServiceConstructor,
): ISystemService {
  return new ctor();
}

export class SystemService extends BaseService implements ISystemService {
  constructor() {
    super();
  }
  // SGV-BUILD-SERVICE-FUNCTION # NOT DELETE
  public login(userName: string, password: string): Promise<any> {
    return this.proxyHttp.post("login", { userName, password });
  }
}
