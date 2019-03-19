import ElementUI from "element-ui";
import Vue from "vue";
import VueRouter from "vue-router";
import app from "./app.vue";
import "./components/factory.comp";
import Common from "./core/common";
import store from "./core/store";
import routes from "./index.router";
import "./styles/common.scss";

Vue.use(ElementUI);

const router = new VueRouter({
  base: Common.getPublicPath(),
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  (window as any).__SWNextFullPath = to.fullPath;
  next();
});

const main = new Vue({
  render: h => h(app),
  router,
  store,
}).$mount("#app");
