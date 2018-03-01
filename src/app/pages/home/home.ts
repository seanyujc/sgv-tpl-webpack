import Vue from "vue";
import Component from "vue-class-component";
import { AutowiredService } from "../../../lib/sg-resource/decorators";
import { ICommonService } from "../../core/services/common.serv";
import BasePage from "../BasePage";

interface IHomePage {
  /** 通用服务 */
  commonService: ICommonService;
}

// console.log(styles);
@Component({
  components: {},
})
export default class HomePage extends BasePage implements IHomePage {
  @AutowiredService
  commonService: ICommonService;

  title: string = "Home";

  show() {
    this.$sg.dialog.conformDialog("haha");
  }

  get tomorrow() {
    return new Date();
  }

  // 生命钩子
  mounted() {
    //
  }
}
