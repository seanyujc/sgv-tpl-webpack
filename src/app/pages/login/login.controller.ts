import Vue from "vue";
import Component from "vue-class-component";
// import Common from "../../core/common";
import { AutowiredService } from "../../../lib/sg-resource/decorators";
import { ICommonService } from "../../core/services/common.serv";

// console.log(styles);
@Component({
  template: require("./login.html"),
  // components: { HeaderBar },
  mounted: () => {
    // const file = new File([""], "file.txt");
    const file: any = document.getElementById("file");
    console.log(file);
  },
})
export default class LoginPage extends Vue {
  @AutowiredService
  commonService: ICommonService;

  title: string = "Login";

  show() {
    alert(this.title);
  }

  get tomorrow() {
    return new Date();
  }

}
