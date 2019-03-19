import { Env, HEADER_TOKEN, IServerConfig } from "../../lib/sg-resource";
import Common from "../core/common";
import { LOGIN_INFO } from "../core/constants";

export const serverConfig: IServerConfig = {
  appKey: [],
  debug: false,
  env: Env.DEV,
  isMock: false,
  protocol: window.location.protocol,
  publicPath: Common.getPublicPath(),
  sites: Common.getSiteInfo(),
  successCode: "0",
};

serverConfig.failCallback = (res: any, resolve, reject) => {
  if (res.errorCode === 1003 && res.subCode === 1001) {
    localStorage.removeItem(HEADER_TOKEN);
    localStorage.removeItem(LOGIN_INFO);
    const nextPath = (window as any).__SWNextFullPath;
    if (nextPath.indexOf("/login") === -1) {
      location.href = "/login";
    }
  } else {
    reject(res);
  }
};
