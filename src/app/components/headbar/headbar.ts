import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from "vue-property-decorator";
import Common from "../../core/common";
import { IJumpApp } from "./store";

@Component
export default class Headbar extends Vue {

  get hasHeadbar() {
    return this.$store.state.headbarComp.hasHeadbar;
  }

  get hasCService() {
    return this.$store.state.headbarComp.hasCService;
  }

  get hasCanlendar() {
    return this.$store.state.headbarComp.hasCanlendar;
  }

  get hasCustomButton() {
    return this.$store.state.headbarComp.customButton !== undefined;
  }

  get customButton() {
    return this.$store.state.headbarComp.customButton;
  }

  get title(): string {
    return this.$store.state.headbarComp.title;
  }

  get jumpApp(): IJumpApp {
    return this.$store.state.headbarComp.jumpApp;
  }

  jumpCustomer(event: Event) {
    event.preventDefault();
    Common.goToActivity({
      pageType: "customService",
    });
  }

  openCanlendar() {
    //
  }

  back() {
    if (this.jumpApp !== undefined) {
      Common.goToActivity(this.jumpApp);
    } else {
      this.$router.back();
    }
  }

  beforeCreate() {
    // this.$store.commit("changeHasHeadbar", true);
  }

  mounted() {
    // tslint:disable-next-line:no-console
    // console.log(this.title);
  }

  destroyed() {
    // this.$store.commit("changeHasHeadbar", false);
  }
}
