import Vue from "vue";
import Component from "vue-class-component";
import Scroller from "vux/src/components/scroller/index.vue";
import { AutowiredService } from "../../../lib/sg-resource/decorators";
import { PULLDOWN_CONFIG, PULLUP_CONFIG } from "../../core/constants";
import { IWithScrollerPage } from "../../core/domain/IWithScrollerPage";
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
export default class FooPage extends BasePage implements IFooPage, IWithScrollerPage {

  @AutowiredService
  commonService: ICommonService;

  title: string = "Foo";
  page: number;
  pageSize: number;
  PULLDOWN_CONFIG: any = PULLDOWN_CONFIG;
  PULLUP_CONFIG: any = PULLUP_CONFIG;

  get today() {
    return new Date();
  }

  pullDonwRefresh(): void {
    setTimeout(() => {
      (this.$refs.xScroller as any).donePulldown();
    }, 800);
  }
  pullUpLoad(): void {
    setTimeout(() => {
      (this.$refs.xScroller as any).donePullup();
    }, 800);
  }
  show() {
    alert(this.commonService.getLocalDomain());
  }

  mounted() {
    //
  }
}
