import Vue from "vue";
import Vuex from "vuex";
import headbarComp from "../../components/headbar/store";

Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    headbarComp,
  },
});
