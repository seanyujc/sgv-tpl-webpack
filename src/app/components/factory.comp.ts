// tslint:disable:no-var-requires
import Vue from "vue";
import dialogPlugin from "./dialog/plugin";
import loadingPlugin from "./loading/plugin";

// SGV-BUILD-COMP-FAC # NOT DELETE
Vue.component("loading", require("./loading/loading.vue").default);
Vue.component("headbar", require("./headbar/headbar.vue").default);

Vue.use(loadingPlugin);
Vue.use(dialogPlugin);
