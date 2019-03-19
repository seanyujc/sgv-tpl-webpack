import { Message } from "element-ui";
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

@Component({})
export class ComBaseComp extends Vue {
  messageError(error: any) {
    if (error === "cancel" || error === "close" || !error) {
      return;
    }
    const h = this.$createElement;
    if (
      error.subMessage ||
      error.errorMessage ||
      (error.message && !error.stack)
    ) {
      Message({
        message: error.subMessage || error.errorMessage || error.message,
        type: "error",
      });
    } else if (error.name === "Simultaneous Request") {
      // tslint:disable-next-line:no-console
      console.warn(error.stack);
      // this.$message({
      //   message: h("div", undefined, [
      //     h("p", undefined, "你的重复操作已被取消！"),
      //     h("blockquote", undefined, error.message),
      //   ]),
      //   type: "warning",
      // });
    } else if (error.message && error.stack) {
      Message({
        dangerouslyUseHTMLString: true,
        message: `<div>
    <p>${error.message}</p>
    <blockquote>${error.stack}</blockquote>
  </div>
  `,
        type: "error",
      });
    } else {
      Message({ message: JSON.stringify(error), type: "error" });
    }
  }
}
