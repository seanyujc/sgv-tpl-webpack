import Vue from "vue";
import VueRouter from "vue-router";
import * as VeeValidate from 'vee-validate';
import routes from "./index.router";
import { SGVFactory } from "../lib/sg-resource/index";
import { apiConfig, serverConfig, mockData } from "./config/index";

Vue.use(VeeValidate);
Vue.use(VueRouter);
SGVFactory.createConfigAdapter(apiConfig, serverConfig, mockData);

const router = new VueRouter({
  routes
})
new Vue({
  router
}).$mount('#app');