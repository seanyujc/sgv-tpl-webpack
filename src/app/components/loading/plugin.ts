/**
 * 插件模式
 * @author jincheng.yu
 */
import LoadingComp from "./loading.vue";

let $vm: any;
let delayTime: any = null;
const plugin = {
  install(vue: any) {
    const Loading = vue.extend(LoadingComp);
    if (!$vm) {
      $vm = new Loading({
        el: document.createElement("div"),
      });
      document.body.appendChild($vm.$el);
    }

    const loading = {
      show(options: any = {}) {
        delayTime = setTimeout(() => {
          $vm.isLoading = true;
        }, options.delay || 0);
      },
      hide() {
        if (delayTime) {
          clearTimeout(delayTime);
          delayTime = null;
        }
        $vm.isLoading = false;
      },
    };
    if (!vue.$lbn) {
      vue.$lbn = {
        loading,
      };
    } else {
      vue.$lbn.loading = loading;
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
