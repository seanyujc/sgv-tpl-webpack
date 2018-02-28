import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from "vue-property-decorator";
import XDialog from "vux/src/components/x-dialog/index.vue";
import { AutowiredService } from "../../../lib/sg-resource/decorators";
import Common from "../../core/common";
import { ICommonService } from "../../core/services/common.serv";

@Component({
  components: {
    XDialog,
  },
})
export default class DialogComp extends Vue {

  @Prop({ default: "" })
  msg: string = "";
  @Prop({ default: false })
  isShowMsg: boolean = false;
  @Prop({ default: "" })
  conformMsg: string = "";
  @Prop({ default: false })
  isShowConform: boolean = false;
  @Prop()
  options: any = { okText: "确认", cancelText: "取消" };

  get isShow() {
    return this.isShowMsg || this.isShowConform;
  }

  set isShow(val: boolean) {
    this.isShowMsg = val;
    this.isShowConform = val;
  }

  @Emit("onClose")
  onClose() {
    //
  }

  conformBtn() {
    //
  }

  // tslint:disable-next-line:no-empty
  // public cancelBtn() {}
  // 生命周期钩子
  mounted() {
    //
  }

}
