// SGV-BUILD-SERVICE-IMPORT # NOT DELETE
import { createCommonService, ICommonService, CommonService } from "./services/common.serv";

export class Services {
  // SGV-BUILD-SERVICE-FAC # NOT DELETE
  static commonService: ICommonService;
  static createCommonService() {
    if (this.commonService) {
      return this.commonService;
    }
    this.commonService = createCommonService(CommonService);
    return this.commonService;
  }
}
