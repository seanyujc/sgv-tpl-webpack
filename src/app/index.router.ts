import { RouteConfig } from "vue-router";
import * as PageFactory from "./pages/factory.page";

const routes: RouteConfig[] = [
  // SGV-BUILD-PAGE-ROUTER-CONFIG # NOT DELETE
  { path: "/home", component: PageFactory.homePagePreloading },
  { path: "/login", component: PageFactory.loginPagePreloading },
  { path: '*', name: 'home', component: PageFactory.homePagePreloading }
];
export default routes;
