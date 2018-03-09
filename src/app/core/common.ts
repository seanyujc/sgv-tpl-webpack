import { Env, ISites } from "../../lib/sg-resource";

declare var NODE_ENV: string;
declare var PUBLIC_PATH: string;
declare var SITE_INFO: string;

export default class Common {
  static Wi: number[] = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1]; // 加权因子
  static ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2]; // 身份证验证位值.10代表X

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
  public static query() {
    const search = location.search.substr(1);
    const querys = search.split("&");
    const q: { [key: string]: any } = {};
    for (const iterator of querys) {
      const query = iterator.split("=");
      q[query[0]] = query[1];
    }
    return q;
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
   * 判断身份证号码为18位时最后的验证位是否正确
   * @param idCard 身份证号码数组
   * @return
   */
  // tslint:disable-next-line:ban-types
  static isTrueValidateCodeBy18IdCard(idCard: string[]) {
    let sum = 0; // 声明加权求和变量
    if (idCard[17].toLowerCase() === "x") {
      idCard[17] = "10"; // 将最后位为x的验证码替换为10方便后续操作
    }
    for (let n = 0; n < 17; n++) {
      sum += this.Wi[n] * +idCard[n]; // 加权求和
    }
    const valCodePosition = sum % 11; // 得到验证码所位置
    if (+idCard[17] === this.ValideCode[valCodePosition]) {
      return true;
    } else {
      return false;
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

  static getOrientation(file: File, callback: (no: number) => void) {
    const reader = new FileReader();
    reader.onload = () => {

      const view = new DataView(reader.result);
      if (view.getUint16(0, false) != 0xFFD8) { return callback(-2); }
      const length = view.byteLength;
      let offset = 2;
      while (offset < length) {
        const marker = view.getUint16(offset, false);
        offset += 2;
        if (marker == 0xFFE1) {
          if (view.getUint32(offset += 2, false) != 0x45786966) { return callback(-1); }
          const little = view.getUint16(offset += 6, false) == 0x4949;
          offset += view.getUint32(offset + 4, little);
          const tags = view.getUint16(offset, little);
          offset += 2;
          for (let i = 0; i < tags; i++) {
            if (view.getUint16(offset + (i * 12), little) == 0x0112) {
              return callback(view.getUint16(offset + (i * 12) + 8, little));
            }
          }
        } else if ((marker & 0xFF00) != 0xFF00) { break; } else { offset += view.getUint16(offset, false); }
      }
      return callback(-1);
    };
    reader.readAsArrayBuffer(file);
  }

  /**
   * 将以base64的图片url数据转换为Blob二进制
   * @param urlData
   *            用url方式表示的base64图片数据
   */
  static dataURLtoBlob(dataurl: string) {
    if (!dataurl) {
      return;
    }
    const arr = dataurl.split(",");
    if (!arr) {
      return;
    }
    const matchRes = arr[0].match(/:(.*?);/);
    if (matchRes === null) {
      return;
    }
    const mime = matchRes[1];
    const bstr = atob(arr[1].replace(/\s/g, ""));
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {
      type: mime,
    });
  }
}
