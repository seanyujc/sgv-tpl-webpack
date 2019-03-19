declare module "wangeditor" {
  import Vue from "vue";
  export class Wangeditor {
    constructor(target: Element | Element[] | Vue | Vue[] | string);

    customConfig: {
      uploadImgServer: string;
      uploadFileName: string;
      uploadImgParams: any;
      uploadImgHooks: {
        customInsert: (
          insertImg: (url: string) => void,
          result: any,
          editor: Wangeditor
        ) => void;
      };
      pasteFilterStyle: boolean;
      menus: string[];
      zIndex: number;
      pasteTextHandle: (content: string) => string;
      onchange: (html: string) => void;
      onblur: (html: string) => void;
    };

    create(): void;
    txt: {
      html: (content: string) => void;
    };
  }

  export default Wangeditor;
}
