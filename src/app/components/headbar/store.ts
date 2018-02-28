import {
  SET_CUSTOM_BUTTON,
  SET_HAS_C_SERVICE,
  SET_HAS_CANLENDAR,
  SET_HAS_HEADBAR,
  SET_JUMP_APP,
  SET_TITLE,
} from "../../core/store/mutationTypes";

export interface IJumpApp {
  pageType?: string;
  params?: any;
}

export interface ICustomButton {
  text: string;
  click: () => void;
  classes?: any;
  styles?: any;
}

export interface IHeadbarCompState {
  /** 是否显示头部 */
  hasHeadbar: boolean;
  /** 是否有客服按钮 */
  hasCService: boolean;
  /** 是否有日历按钮 */
  hasCanlendar: boolean;
  /** 自定义右侧按钮 */
  customButton?: ICustomButton;
  /** 是否返回按钮是返回到APP */
  jumpApp?: IJumpApp;
  /** 标题 */
  title: string;
}

export class HeadbarCompState implements IHeadbarCompState {
  hasHeadbar: boolean = false;
  hasCService: boolean = false;
  hasCanlendar: boolean = false;
  customButton: ICustomButton | undefined = undefined;
  jumpApp?: IJumpApp | undefined = undefined;
  title: string = "";
}

const xState: IHeadbarCompState = new HeadbarCompState();
const getters = {

};
const actions = {

};
// 改变
const mutations = {
  [SET_HAS_HEADBAR](state: IHeadbarCompState, val: boolean) {
    state.hasHeadbar = val;
  },
  [SET_HAS_C_SERVICE](state: IHeadbarCompState, val: boolean) {
    state.hasCService = val;
  },
  [SET_HAS_CANLENDAR](state: IHeadbarCompState, val: boolean) {
    state.hasCanlendar = val;
  },
  [SET_CUSTOM_BUTTON](state: IHeadbarCompState, val: ICustomButton) {
    state.customButton = val;
  },
  [SET_JUMP_APP](state: IHeadbarCompState, val: IJumpApp) {
    state.jumpApp = val;
  },
  [SET_TITLE](state: IHeadbarCompState, val: string) {
    state.title = val;
  },
};
export default {
  state: xState,
  getters,
  actions,
  mutations,
};
