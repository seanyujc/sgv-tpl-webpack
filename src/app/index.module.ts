import * as VeeValidate from "vee-validate";
import Vue from "vue";
import VueRouter from "vue-router";
import { SGVFactory } from "../lib/sg-resource/index";
import { apiConfig, mockData, serverConfig } from "./config/index";
import routes from "./index.router";
import "./index.component";

Vue.use(VeeValidate);
Vue.use(VueRouter);
SGVFactory.createConfigAdapter(apiConfig, serverConfig, mockData);

const router = new VueRouter({
  routes,
});
new Vue({
  router,
}).$mount("#app");
