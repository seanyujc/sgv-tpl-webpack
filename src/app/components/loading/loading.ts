import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from "vue-property-decorator";
import { AutowiredService } from "../../../lib/sg-resource/decorators";
import Common from "../../core/common";
import { ICommonService } from "../../core/services/common.serv";
// import Common from "../../core/common";

@Component({
  props: {
    isLoading: Boolean,
  },
})
export default class LoadingComp extends Vue {

  @Prop({ default: false })
  isLoading: boolean;

  PUBLIC_PATH: string = Common.getPublicPath();
  isAndroid: boolean = Common.ismobile() === 1;

  // @Watch("isLoading")
  // watchIsLoading(newVal: boolean) {
  //   console.log(newVal);
  // }

  // 生命周期钩子
  mounted() {
    //
  }

}
