import { BaseService } from "./base.serv";

export interface ICommonService {

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
}
