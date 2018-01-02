import Vue from "vue";
import Component from "vue-class-component";
import { AutowiredService } from "../../../lib/sg-resource/decorators";
import { ICommonService } from "../../core/services/common.serv";

// console.log(styles);
@Component({
  // components: { HeaderBar },
  mounted: () => {
    // const file = new File([""], "file.txt");
    const file: any = document.getElementById("file");
    console.log(file);
  },
})
export default class FootbarPage extends Vue {
  @AutowiredService
  private commonService: ICommonService;
  
  private title: string = "Footbar";

  public show() {
    alert(this.commonService.getLocalDomain());
  }

  get tomorrow() {
    return new Date();
  }

}