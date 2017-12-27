import { IMockData } from "../../lib/sg-resource/config";

export const mockData: IMockData = {
  post: {
    login: { code: "000000", msg: "操作成功", data: "AC4A9C7867144799BE9D8174C4E6BE4E", page: null },
    getUserInfo: {
      code: "000000", msg: "操作成功",
      data: {
        token: null, id: 314, company: "荣氏集团", companyAbbr: "荣", contacts: "张荣荣", mobile: "13300000000",
        email: "1294468365@qq.com", qq: "1294468365", website: "http://www.baidu.com", addr: "松江大学城",
        logo: "/group1/M00/00/E5/rBBnzFn8DyGAX3aUAABnAJw0r6U100.png", sacode: null, status: 1, amount: 0,
      },
      page: null,
    },
  },
  get: {},
};
