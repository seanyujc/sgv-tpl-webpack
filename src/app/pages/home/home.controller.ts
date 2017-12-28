import Vue from "vue";
import Component from "vue-class-component";
// import Common from "../../core/common";

// console.log(styles);
@Component({
  template: require("./home.html"),
  // components: { HeaderBar },
  mounted: () => {
    // const file = new File([""], "file.txt");
    const file: any = document.getElementById("file");
    console.log(file);
  },
})
export default class HomePage extends Vue {

  private title: string = "Home";

  public show() {
    alert(this.title);
  }

  get tomorrow() {
    return new Date();
  }

}
