import Vue from "vue";
import HeaderBar from "./components/headbar/headbar.vue";

const components = {
  HeaderBar,
};

Vue
  .component("HeaderBar", HeaderBar)
  ;

export default {
  HeaderBar,
};
