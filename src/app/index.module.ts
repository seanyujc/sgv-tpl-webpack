import * as VeeValidate from "vee-validate";
import Vue from "vue";
import VueRouter from "vue-router";
import "./components/factory.comp";
import "./core/filter";
import store from "./core/store";
import routes from "./index.router";
import "./styles/common.scss";

Vue.use(VeeValidate);
Vue.use(VueRouter);
const router = new VueRouter({
  routes,
});
const history: Storage = window.sessionStorage;
history.clear();
let historyCount = +(history.getItem("count") || 0);
history.setItem("/", "0");

let isPush = false;
let endTime = Date.now();
const methods = ["push", "go", "replace", "forward", "back"];
document.addEventListener("touchend", () => {
  endTime = Date.now();
});
methods.forEach((key) => {
  const method = (router as any)[key].bind(router);
  // tslint:disable-next-line:only-arrow-functions
  (router as any)[key] = function (...args: any[]) {
    isPush = true;
    method.apply(null, args);
  };
});

const app: Vue = new Vue({
  router,
  store,
  data: {
    transitionName: "slide-left",
  },
  computed: {
    hasHeadbar(): boolean {
      return this.$store.state.headbarComp.hasHeadbar;
    },
  },
  methods: {
    beforeEnter() {
      // 转页动画开始之前
    },
    afterLeave() {
      // 转页动画结束之后
    },
  },
}).$mount("#app");

router.onReady(() => {
  const key = router.currentRoute.path.match(/\/\w+/);
  if (key && !history.getItem(key[0])) {
    ++historyCount;
    history.setItem("count", historyCount.toString());
    if (key[0] !== "/") { history.setItem(key[0], historyCount.toString()); }
  }
});

router.beforeEach((to, from, next) => {
  const toKey = to.path.match(/\/\w+/);
  const fromKey = from.path.match(/\/\w+/);
  if (!toKey || !fromKey) {
    return;
  }
  const toIndex = history.getItem(toKey[0]);
  const fromIndex = history.getItem(fromKey[0]);
  if (toIndex) {
    if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === "0" && fromIndex === "0")) {
      if (!isPush && (Date.now() - endTime) < 377) {
        app.$data.transitionName = "";
      } else {
        app.$data.transitionName = "slide-left";
      }
    } else {
      if (!isPush && (Date.now() - endTime) < 377) {
        app.$data.transitionName = "";
      } else {
        app.$data.transitionName = "slide-right";
      }
    }
  } else {
    ++historyCount;
    history.setItem("count", historyCount.toString());
    if ( toKey[0] !== "/") { history.setItem(toKey[0], historyCount.toString()); }
    app.$data.transitionName = "slide-left";
  }

  app.$sg.loading.show({ delay: 500 });
  if (/\/http/.test(to.path)) {
    const url = to.path.split("http")[1];
    window.location.href = `http${url}`;
  } else {
    next();
  }
});

router.afterEach(() => {
  app.$sg.loading.hide();
});
