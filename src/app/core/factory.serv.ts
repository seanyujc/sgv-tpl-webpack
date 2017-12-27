// SGV-BUILD-SERVICE-IMPORT # NOT DELETE
import { createPersonService, IPersonService, PersonService } from "./services/person.serv";
import { createCommonService, ICommonService, CommonService } from "./services/common.serv";

export class Services {
  // SGV-BUILD-SERVICE-FAC # NOT DELETE
  // 'Person' SERVICE FACTORY START
  static personService: IPersonService;  
  static createPersonService() {
    if (this.personService) {
      return this.personService;
    }
    this.personService = createPersonService(PersonService);
    return this.personService;
  }
  // 'Person' SERVICE FACTORY END
  static commonService: ICommonService;
  static createCommonService() {
    if (this.commonService) {
      return this.commonService;
    }
    this.commonService = createCommonService(CommonService);
    return this.commonService;
  }
}
