import Vue from "vue";
import { RouteConfig } from "vue-router";
import VueRouter from "vue-router";
import { ConfigAdapter } from "../lib/sg-resource";
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
const scrollBehavior = (to: any, from: any, savedPosition: any) => {
  return savedPosition || { x: 0, y: 0 };
};
const { env, sites } = ConfigAdapter.getConfig();
const router = new VueRouter({
  base: sites[env].publicPath,
  mode: "history",
  routes,
  scrollBehavior,
});

export default router;
