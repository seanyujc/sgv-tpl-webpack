import * as qiniu from "qiniu-js";
import { BaseService } from "./base.serv";
export interface ICommonService {
  // SGV-BUILD-SERVICE-INTERFACE # NOT DELETE
  uploadFile(
    file: File,
    fileNamePrefix: string,
    observer: qiniu.IObserver,
  ): Promise<any>;
  getUploadToken(fileNamePrefix: string): Promise<any>;
}

type ICommonServiceConstructor = new () => ICommonService;

export function createCommonService(
  ctor: ICommonServiceConstructor,
): ICommonService {
  return new ctor();
}

export class CommonService extends BaseService implements ICommonService {
  constructor() {
    super();
  }
  // SGV-BUILD-SERVICE-FUNCTION # NOT DELETE
  public async uploadFile(
    file: File,
    fileNamePrefix: string,
    observer: qiniu.IObserver,
  ): Promise<any> {
    try {
      const data: {
        fileName: string;
        imageUrl: string;
        uploadToken: string;
      } = await this.getUploadToken(fileNamePrefix);
      // 取文件后缀
      const names = file.name.split(".");
      const ext =
        file.name && names.length > 1 ? "." + names[names.length - 1] : "";
      const config: qiniu.IConfig = {
        region: qiniu.region.z0,
        useCdnDomain: true,
      };
      const putExtra: qiniu.IPutExtra = {
        fname: file.name,
        mimeType: null,
        params: {},
      };
      const observable = qiniu.upload(
        file,
        data.fileName + ext,
        data.uploadToken,
        putExtra,
        config,
      );
      const complete = observer.complete;
      observer.complete = (res: any) => {
        res.url = data.imageUrl + data.fileName + ext;
        complete(res);
      };
      const subscription = observable.subscribe(observer);
      return subscription;
    } catch (error) {
      return Promise.reject(error);
    }
  }
  public getUploadToken(fileNamePrefix: string): Promise<any> {
    return this.proxyHttp.get("getUploadToken", {}, [fileNamePrefix]);
  }
}
