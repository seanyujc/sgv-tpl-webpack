import { BaseService } from "./base.serv";

export interface ICommonService {
  // SGV-BUILD-SERVICE-INTERFACE # NOT DELETE
  getLocalDomain(): string;
}

interface ICommonServiceConstructor {
  new(): ICommonService;
}

export function createCommonService(ctor: ICommonServiceConstructor): ICommonService {
  return new ctor();
}

export class CommonService extends BaseService implements ICommonService {
  constructor() {
    super();
  }
  // SGV-BUILD-SERVICE-FUNCTION # NOT DELETE
  public getLocalDomain(): string {
    return this.configAdapter.localSite;
  }
}
