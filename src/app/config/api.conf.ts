import { IApiConfig } from "../../lib/sg-resource";
import { Services } from "../core/factory.serv";
export const apiConfig: IApiConfig = {
  hosts: {
    apiHost: { dir: "" },
    bsm: { dir: "/gateway" },
    promotor: { dir: "/promotor", domain: "api.duileme.cn" },
  },
  post: {
    // SGV-BUILD-API-POST # NOT DELETE
    getLocalDomain: "apiHost:/getLocalDomain",
    fetchRecords: "apiHost:/fetchRecords",
    // 3.1	用户登录
    login: "bsm:/user/dologin", // ? sourceCode=&sourceUserId=&userName=&headUrl=&sex=&phone=&email=
    // 3.3	个人信息
    getUserInfo: "apiHost:/user/info", // ?token
  },
  get: {
    // SGV-BUILD-API-GET # NOT DELETE
    fetchMissionhallList: "promotor:/app/missionhall/list", // ?openId=ofq36s-R8ZnbZjZvhTa9sSWP-51k
  },
  serviceFactory: Services,
};
