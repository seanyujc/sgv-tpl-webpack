import Vue from "vue";
import Headbar from "./headbar/headbar.vue";
import Footbar from "./footbar/footbar.vue";
import Calandar from "./calandar/calandar.vue";

// SGV-BUILD-COMP-FAC # NOT DELETE
Vue.component("calandar", require("./calandar/calandar.vue").default);
Vue.component("footbar", Footbar);
Vue.component("headbar", Headbar);

