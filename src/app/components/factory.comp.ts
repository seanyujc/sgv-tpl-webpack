import Vue from "vue";
import Headbar from "./headbar/headbar.vue";
import Footbar from "./footbar/footbar.vue";

export function run() {
  Vue
    // SGV-BUILD-COMP-FAC # NOT DELETE
    .component("footbar", Footbar)
    .component("headbar", Headbar)
    ;
}
