import * as VeeValidate from "vee-validate";
import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./index.router";
import "./components/factory.comp";
import "./styles/common.scss";

Vue.use(VeeValidate);
Vue.use(VueRouter);
const router = new VueRouter({
  routes,
});
new Vue({
  router,
}).$mount("#app");
