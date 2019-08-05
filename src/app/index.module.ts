import ElementUI from "element-ui";
import Vue from "vue";
import VueRouter from "vue-router";
import { ConfigAdapter } from "../lib/sg-resource";
import app from "./app.vue";
import "./components/factory.comp";
import Common from "./core/common";
import store from "./core/store";
import router from "./index.router";
import "./styles/common.scss";

Vue.use(ElementUI);

router.beforeEach((to, from, next) => {
  (window as any).__SWNextFullPath = to.fullPath;
  next();
});

const { env, sites } = ConfigAdapter.getConfig();
Vue.$sg.configAdapter.env = env;
Vue.$sg.configAdapter.sites = sites;

const main = new Vue({
  render: h => h(app),
  router,
  store,
}).$mount("#app");
