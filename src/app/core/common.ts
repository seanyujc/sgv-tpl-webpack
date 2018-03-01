import { Env, ISites } from "../../lib/sg-resource";

declare var NODE_ENV: string;
declare var PUBLIC_PATH: string;
declare var SITE_INFO: string;

export default class Common {
  static showMsg(msg = "123") {
    alert(msg);
  }

  static getEnv(): Env {
    let env = Env.DEV;
    if (NODE_ENV === "TEST") {
      env = Env.TEST;
    } else if (NODE_ENV === "PROD") {
      env = Env.PROD;
    }
    return env;
  }
  static getSiteInfo(): ISites {
    const siteInfo: any = SITE_INFO;
    const o: any = {};
    o[Env.DEV] = siteInfo.DEV;
    o[Env.TEST] = siteInfo.TEST;
    o[Env.UAT] = siteInfo.UAT;
    o[Env.PROD] = siteInfo.PROD;
    return o;
  }
  /**
   * 得到环境变量的配置
   */
  static getPublicPath() {
    return PUBLIC_PATH;
  }

  static merge(left: any[], right: any[]) {
    const result = [];
    while (left.length > 0 && right.length > 0) {
      if (left[0] < right[0]) {
        result.push(left.shift());
      } else {
        result.push(right.shift());
      }
    }
    return result.concat(left).concat(right);
  }

  static mergeSort(items: any[]): any[] {
    if (items.length === 1) {
      return items;
    }
    const middle = Math.floor(items.length / 2);
    const left = items.slice(0, middle);
    const right = items.slice(middle);
    return this.merge(this.mergeSort(left), this.mergeSort(right));
  }

  /**
   * 判断手机的基本类型
   */
  static ismobile() {
    const u = navigator.userAgent;
    if (u.indexOf("Android") > -1 || u.indexOf("Linux") > -1) {
      return 1;
    } else if (u.indexOf("iPhone") > -1) {
      return 0;
    } else if (u.indexOf("Windows Phone") > -1) {
      return -1;
    }
  }

  /**
   * 跳转到原生app的方法
   * @param obj 传递参数的对象
   */
  public static goToActivity(obj: { pageType?: string, params?: any }) {
    const data: { pageType?: string, params?: any } = {};
    data.pageType = obj.pageType ? obj.pageType : "web";
    data.params = obj.params ? obj.params : {};
    const dataStr = JSON.stringify(data);
    const phoneType = this.ismobile();
    let callBack: any;
    if (phoneType === 1) {
      callBack = (window as any).android.gotoActivity(dataStr);
    } else if (phoneType === 0) {
      callBack = (window as any).gotoActivity(dataStr);
    }
    return callBack;
  }
}
