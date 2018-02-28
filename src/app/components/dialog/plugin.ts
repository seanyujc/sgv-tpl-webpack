/**
 * 插件模式
 * @author rongrong.zhang
 */
import DialogComp from "./dialog.vue";

let $vm: any;
const plugin = {
  install(vue: any) {
    const Dialog = vue.extend(DialogComp);
    if (!$vm) {
      $vm = new Dialog({
        el: document.createElement("div"),
      });
      document.body.appendChild($vm.$el);
    }

    const dialog = {
      dialog(msg: string) {
        $vm.msg = msg;
        $vm.isShowMsg = true;
        // tslint:disable-next-line:only-arrow-functions
        setTimeout(() => {
          $vm.isShow = false;
        }, 1000);
      },
      conformDialog(msg: string, options?: any) {
        return new Promise((resolve, reject) => {
          $vm.conformMsg = msg;
          $vm.isShowConform = true;
          // tslint:disable-next-line:only-arrow-functions
          $vm.cancelBtn = () => {
            $vm.isShowConform = false;
            reject();
          };

          if (options) {
            $vm.options = options;
          }

          $vm.conformBtn = () => {
            resolve();
          };
          $vm.$on("onClose", () => {
            reject();
          });
        });
      },
    };
    if (!vue.$lbn) {
      vue.$lbn = {
        dialog,
      };
    } else {
      vue.$lbn.lbnDialog = dialog;
    }
    // 注入组件
    vue.mixin({
      created() {
        this.$lbn = vue.$lbn;
      },
    });
  },
};
export default plugin;
