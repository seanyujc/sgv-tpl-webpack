import { ElForm } from "element-ui/types/form";
import Vue from "vue";
import Component, { mixins } from "vue-class-component";
import { AutowiredService } from "../../../lib/sg-resource/decorators";
import { ComBaseComp } from "../../core/ComBaseComp";
import Common from "../../core/common";
import { SystemService } from "../../core/services/system.serv";
import { SET_ACCOUNT_INFO } from "../../core/store/mutationTypes";

interface ILoginPage {}

@Component({
  components: {},
  name: "login",
})
export default class LoginPage extends mixins(ComBaseComp)
  implements ILoginPage {
  @AutowiredService
  systemService: SystemService;

  form: any = {};
  rules: any = {
    password: [{ required: true, message: "请输入您的密码", trigger: "blur" }],
    userName: [
      {
        message: "请输入您的用户名/手机/邮箱",
        required: true,
        trigger: "blur",
      },
    ],
  };
  title: string = "登录";
  dialogSignupVisible: boolean = false;
  role: number = 0;

  get loginForm() {
    return this.$refs.loginForm as ElForm;
  }

  async submitForm() {
    const valid = await this.loginForm.validate();
    try {
      if (valid) {
        const data = await this.systemService.login(
          this.form.userName,
          this.form.password,
        );
        this.$store.commit(SET_ACCOUNT_INFO, data);
        this.$router.replace("/");
      }
    } catch (error) {
      this.messageError(error);
    }
  }
  signup() {
    this.dialogSignupVisible = true;
  }
  confirmRole() {
    this.$router.push({
      name: "signup",
      params: { role: this.role.toString() },
    });
  }

  fetchData() {
    //
  }
  /* 生命钩子 START */
  created() {
    Common.addClass(document.querySelector("html"), "login-page");
  }
  mounted() {
    //
    console.log(this.$sg);
    
  }
  destroyed() {
    Common.removeClass(document.querySelector("html"), "login-page");
  }
}
