import { IApiConfig, IHosts } from "../../lib/sg-resource";
import { Services } from "../core/factory.serv";
export const apiConfig: IApiConfig = {
  hosts: {
    api: { dir: "" },
    bsm: { dir: "/gateway" },
    promotor: { dir: "/promotor", domain: "api.duileme.cn" },
  },
  post: {
    // 3.1	用户登录
    login: "bsm:/user/dologin", // ? sourceCode=&sourceUserId=&userName=&headUrl=&sex=&phone=&email=
    // 3.3	个人信息
    getUserInfo: "api:/user/info", // ?token
  },
  get: {
    fetchMissionhallList: "promotor:/app/missionhall/list", // ?openId=ofq36s-R8ZnbZjZvhTa9sSWP-51k
  },
  serviceFactory: Services,
};
