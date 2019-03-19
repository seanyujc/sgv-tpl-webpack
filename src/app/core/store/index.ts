import { Message } from "element-ui";
import Vue from "vue";
import Vuex from "vuex";
import { LOGIN_INFO } from "../constants";
import { SET_ACCOUNT_INFO, SET_PROJECT_NAME } from "./mutationTypes";

Vue.use(Vuex);

const state = {
  accountInfo: {},
  projectName: "",
};
const info = localStorage.getItem(LOGIN_INFO);
if (info) {
  try {
    const accountInfo = JSON.parse(info);
    state.accountInfo = accountInfo;
  } catch (error) {
    Message.error(error);
  }
}

export default new Vuex.Store<any>({
  mutations: {
    [SET_ACCOUNT_INFO](store, val) {
      store.accountInfo = val;
    },
    [SET_PROJECT_NAME](store, val) {
      store.projectName = val;
    },
  },
  state,
});
