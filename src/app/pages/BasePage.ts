import Vue from "vue";
import Component from "vue-class-component";
import { AutowiredService } from "../../lib/sg-resource/decorators";
import { ICustomButton, IJumpApp } from "../components/headbar/store";
import { IPage } from "../core/domain/IPage";
import { ICommonService } from "../core/services/common.serv";
import {
  SET_CUSTOM_BUTTON,
  SET_HAS_C_SERVICE,
  SET_HAS_CANLENDAR,
  SET_HAS_HEADBAR,
  SET_JUMP_APP,
  SET_TITLE,
} from "../core/store/mutationTypes";

@Component
export default class BasePage extends Vue implements IPage {

  title: string = "";
  protected hasHeadbar: boolean = true;
  protected hasCService: boolean = false;
  protected hasCanlendar: boolean = false;
  protected jumpApp?: IJumpApp = undefined;
  protected customButton?: ICustomButton = undefined;

  get headbarHeightPX() {
    return .84 * (window as any).RATE * 100;
  }

  /**
   * 得像素的放大比例
   */
  get getPXRate() {
    return (window as any).RATE;
  }

  getBarWidthBase(itemText = "") {
    const nums = itemText.match(/\d|\w|\(|\)/g);
    const words = itemText.match(/[^A-Za-z0-9_()]/g);

    const numCount = nums !== null ? nums.length : 0;
    const wordCount = words !== null ? words.length : 0;
    const width = wordCount * 26 * this.getPXRate + numCount * 13 * this.getPXRate;
    return width + "px";
  }

  created() {
    // 头部状态的改变开始 -------------
    this.$store.commit(SET_TITLE, this.title);
    this.$store.commit(SET_HAS_HEADBAR, this.hasHeadbar);
    this.$store.commit(SET_HAS_C_SERVICE, this.hasCService);
    this.$store.commit(SET_HAS_CANLENDAR, this.hasCanlendar);
    this.$store.commit(SET_CUSTOM_BUTTON, this.customButton);
    this.$store.commit(SET_JUMP_APP, this.jumpApp);
    // ---------------- 头部状态的改变结束
  }

  activated() {
    // 头部状态的改变开始 -------------
    this.$store.commit(SET_TITLE, this.title);
    this.$store.commit(SET_HAS_HEADBAR, this.hasHeadbar);
    this.$store.commit(SET_HAS_C_SERVICE, this.hasCService);
    this.$store.commit(SET_HAS_CANLENDAR, this.hasCanlendar);
    this.$store.commit(SET_CUSTOM_BUTTON, this.customButton);
    this.$store.commit(SET_JUMP_APP, this.jumpApp);
    // ---------------- 头部状态的改变结束
  }

}
