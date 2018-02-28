import Vue from "vue";
import Component from "vue-class-component";
import { AutowiredService } from "../../../lib/sg-resource/decorators";
import { ICommonService } from "../../core/services/common.serv";

// console.log(styles);
@Component({
  components: {},
})
export default class FootbarPage extends Vue {

  title: string = "Footbar";

}
