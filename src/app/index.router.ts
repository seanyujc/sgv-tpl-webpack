import Vue from "vue";
import { RouteConfig } from "vue-router";
import VueRouter from "vue-router";
import * as PageFactory from "./pages/factory.page";
Vue.use(VueRouter);
// tslint:disable:object-literal-sort-keys
const routes: RouteConfig[] = [
  // SGV-BUILD-PAGE-ROUTER-CONFIG # NOT DELETE
  { path: "/home", name: "home", component: PageFactory.homePagePreloading },
  { path: "*", redirect: "login" },
  { path: "/login", name: "login", component: PageFactory.loginPagePreloading },
  { path: "/login/:return", name: "loginReturn", component: PageFactory.loginPagePreloading },
  {
    path: "*",
    redirect: "login",
  },
];
export default routes;
