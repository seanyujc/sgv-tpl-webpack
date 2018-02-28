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
let historyCount = +(history.getItem("count") || 0);
history.setItem("/", "0");

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
  if (!history.getItem(router.currentRoute.path)) {
    ++historyCount;
    history.setItem("count", historyCount.toString());
    if (router.currentRoute.path !== "/") { history.setItem(router.currentRoute.path, historyCount.toString()); }
  }
});

router.beforeEach((to, from, next) => {
  const toIndex = history.getItem(to.path);
  const fromIndex = history.getItem(from.path);
  if (toIndex) {
    if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === "0" && fromIndex === "0")) {
      app.$data.transitionName = "slide-left";
    } else {
      app.$data.transitionName = "slide-right";
    }
  } else {
    ++historyCount;
    history.setItem("count", historyCount.toString());
    if (to.path !== "/") { history.setItem(to.path, historyCount.toString()); }
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
