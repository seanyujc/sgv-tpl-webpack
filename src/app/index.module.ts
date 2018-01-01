import * as VeeValidate from "vee-validate";
import Vue from "vue";
import VueRouter from "vue-router";
import { SGVFactory } from "../lib/sg-resource/index";
import { apiConfig, mockData, serverConfig } from "./config/index";
import routes from "./index.router";
import * as Component from  "./components/factory.comp";
import "./styles/common.scss";

Vue.use(VeeValidate);
Vue.use(VueRouter);
SGVFactory.createConfigAdapter(apiConfig, serverConfig, mockData);
Component.run();

const router = new VueRouter({
  routes,
});
new Vue({
  router,
}).$mount("#app");
