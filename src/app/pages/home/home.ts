import Vue from "vue";
import Component from "vue-class-component";
import { AutowiredService } from "../../../lib/sg-resource/decorators";
import { ICommonService } from "../../core/services/common.serv";

// import Common from "../../core/common";

// console.log(styles);
@Component({
  mounted: () => {
    // const file = new File([""], "file.txt");
    const file: any = document.getElementById("file");
    console.log(file);
  },
})
export default class HomePage extends Vue {
  @AutowiredService
  private commonService: ICommonService;
  
  private title: string = "Home";

  public show() {
    alert(this.commonService.getLocalDomain());
  }

  get tomorrow() {
    return new Date();
  }

}
