import Vue from "vue";
import Component from "vue-class-component";
import Scroller from "vux/src/components/scroller/index.vue";
import { AutowiredService } from "../../../lib/sg-resource/decorators";
import { ICommonService } from "../../core/services/common.serv";
import BasePage from "../BasePage";

interface IFooPage {
  /** 通用服务 */
  commonService: ICommonService;
}

@Component({
  name: "foo",
  components: {
    Scroller,
  },
})
export default class FooPage extends BasePage implements IFooPage {
  @AutowiredService
  commonService: ICommonService;

  title: string = "Foo";

  get today() {
    return new Date();
  }

  show() {
    alert(this.commonService.getLocalDomain());
  }

  mounted() {
    //
  }
}
