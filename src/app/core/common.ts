import { Env, ISites } from "../../lib/sg-resource";

declare var PUBLIC_PATH: string;
declare var SITE_INFO: string;

export default class Common {
  /**
   * 得到编译期环境变量的配置
   */
  static getPublicPath() {
    return PUBLIC_PATH;
  }

  static getSiteInfo(): ISites {
    const siteInfo: any = SITE_INFO;
    const o: any = {};
    o[Env.DEV] = siteInfo.DEV;
    o[Env.TEST] = siteInfo.TEST;
    o[Env.UAT] = siteInfo.UAT;
    o[Env.MASTER] = siteInfo.MASTER;
    return o;
  }

  /**
   * 是否有样式名
   * @param el Dom对象
   * @param className 样式名
   */
  static hasClass(el: Element, className: any) {
    const reg = new RegExp("(^|\\s)" + className + "(\\s|$)");
    return reg.test(el.className);
  }
  /**
   * 添加class
   * @param el Dom对象
   * @param className 样式名
   */
  static addClass(el: Element | HTMLElement | null, className: any) {
    if (el == null || this.hasClass(el, className)) {
      return;
    }
    const newClass = el.className.split(" ");
    newClass.push(className);
    el.className = newClass.join(" ");
  }
  /**
   * 删除class
   * @param el Dom对象
   * @param className 样式名
   */
  static removeClass(el: Element | null, className: string) {
    if (el == null || !this.hasClass(el, className)) {
      return;
    }
    const newClass = el.className.split(" ");
    newClass.indexOf(className);
    newClass.splice(newClass.indexOf(className), 1);
    el.className = newClass.join(" ");
  }
}
