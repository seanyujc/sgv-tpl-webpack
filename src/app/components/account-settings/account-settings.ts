import { ElForm } from "element-ui/types/form";
import { mixins } from "vue-class-component";
import {
  Component,
  Emit,
  Inject,
  Model,
  Prop,
  Provide,
  Vue,
  Watch,
} from "vue-property-decorator";
import { mapState } from "vuex";
import { SystemService } from "../../../app/core/services/system.serv";
import { AutowiredService } from "../../../lib/sg-resource/decorators";
import { ComBaseComp } from "../../core/ComBaseComp";
import { AVATAR, LOGIN_INFO } from "../../core/constants";

@Component({
  computed: {
    ...mapState(["accountInfo"]),
  },
})
export default class AccountSettings extends mixins(ComBaseComp) {
  @AutowiredService
  systemService: SystemService;

  AVATAR = AVATAR;
  isVisibleSettingsDialog: boolean = false;

  model: any = { oldPassword: "", password1: "", password2: "" };
  rules = {
    oldPassword: [{ required: true, message: "请输入旧密码", trigger: "blur" }],
    password1: [{ required: true, message: "请输入新密码", trigger: "blur" }],
    password2: [
      { required: true, message: "请再次输入新密码", trigger: "blur" },
      { validator: this.validatePass2, trigger: "blur" },
    ],
  };

  get accountForm() {
    return this.$refs.accountForm as ElForm;
  }

  validatePass2(rule: any, value: any, callback: any) {
    if (value === "") {
      callback(new Error("请再次输入密码"));
    } else if (value !== this.model.password1) {
      callback(new Error("两次输入密码不一致!"));
    } else {
      callback();
    }
  }

  handleCommand(command: string) {
    switch (command) {
      case "settings":
        this.isVisibleSettingsDialog = true;
        this.$nextTick(() => {
          this.model = { oldPassword: "", password1: "", password2: "" };
          this.accountForm.clearValidate();
        });
        break;
      case "exit":
        localStorage.clear();
        // console.log(this.$root);
        // this.$store.commit(SET_HAS_HEADBAR, false);
        this.$router.push({
          name: "login",
        });

        break;
      default:
        break;
    }
  }

  /**
   * 提交设置
   */
  async handleSettingsSubmit() {
    try {
      if (await this.accountForm.validate()) {
        // await this.systemService.modifySystemUserPWD(
        //   this.accountInfo.adminUser.id,
        //   this.model.oldPassword,
        //   this.model.password1,
        //   this.model.password2,
        // );
        this.$message.success("修改成功！");
        this.isVisibleSettingsDialog = false;
      }
    } catch (error) {
      this.messageError(error);
    }
  }
  /* 生命钩子 START */
  mounted() {
    //
    // console.log(this.accountInfo);
  }
}
