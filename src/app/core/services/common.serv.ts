import { BaseService } from "./base.serv";

export interface ICommonService {
  // SGV-BUILD-SERVICE-INTERFACE # NOT DELETE
  getLocalDomain(): string;
  selectFile(
    size: number, accept: string, isSquare?: boolean, capture?: boolean,
    multiple?: boolean): Promise<string>;
}

interface ICommonServiceConstructor {
  new(): ICommonService;
}

export function createCommonService(ctor: ICommonServiceConstructor): ICommonService {
  return new ctor();
}

export class CommonService extends BaseService implements ICommonService {
  constructor() {
    super();
  }
  // SGV-BUILD-SERVICE-FUNCTION # NOT DELETE
  public getLocalDomain(): string {
    return this.configAdapter.localSite;
  }

  
  /**
   * 选择一个文件
   * @param accept 文件类型
   * @param capture 获取方式
   * @return promise对象
   */
  selectFile(size: number, accept: string, isSquare = false, capture = false, multiple = false): Promise<string> {
    return new Promise((resolve, reject) => {
      const div = document.createElement("div");
      const inputFile = document.createElement("input");
      div.appendChild(inputFile);
      const event = new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: true,
      });
      // inputFile.value = "123";
      inputFile.type = "file";
      // inputFile.accept = accept;
      if (capture) {
        inputFile.setAttribute("capture", "camera");
      }
      if (multiple) {
        inputFile.setAttribute("multiple", "multiple");
      }
      $(inputFile).bind("change", (ev: any) => {
        if (size && ev.target.files[0].size > 1024 * 1024 * size) {
          reject({ code: 100001, msg: "请上传小于" + size + "M文件" });
          return;
        }
        // this.$log.log(ev.target.files[0]);
        
        if (accept !== "" && !accept.match(ev.target.files[0].type)) {
          reject({ code: 100002, msg: "文件类型不匹配" });
          return;
        }
        if (ev.target.files[0].type === "") {
          // TXT,PPT,PPTX,XLSX,XLS,PDF,PNG,JPG,JPEG,DOC,DOCX
          const arr = ["TXT", "PPT", "PPTX", "DOC", "DOCX", "XLS", "XLSX", "PDF"];
          const index = ev.target.files[0].name.lastIndexOf(".");
          const ext = ev.target.files[0].name.toUpperCase().substr(index + 1);
          let flag = false;
          // this.$log.log(index, ext);
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < arr.length; i++) {
            if (ext === arr[i]) {
              flag = true;
              break;
            }
          }
          if (!flag) {
            reject({ code: 100002, msg: "文件类型不匹配" });
            return;
          }
        }
        const files = ev.target.files;
        if (!ev.target.files[0].type.match("image")) {
          resolve(files);
          return;
        }
        const reader = new FileReader();
        reader.onload = () => {
          // this.$log.log(reader.result);
          const img = new Image();
          img.onload = () => {
            if (isSquare && ev.target.files[0].type.match("image")) {
              if (img.height === img.width) {
                Common.getOrientation(files[0], (orientation) => {
                  // alert("orientation: " + orientation);
                  resolve(this.dealImg(img, orientation, files[0].name));
                });
              } else {
                reject({ code: 100003, msg: "文件不是正方形" });
              }
            } else {
              Common.getOrientation(files[0], (orientation) => {
                // alert("orientation: " + orientation);
                resolve(this.dealImg(img, orientation, files[0].name));
              });
              // resolve(files);
            }
          };
          img.src = reader.result;
        };
        reader.readAsDataURL(ev.target.files[0]);
      });

      window.document.body.appendChild(div);

      // inputFile.click();
      inputFile.dispatchEvent(event);

      $(div).hide();
    });
  }

  dealImg(img: HTMLImageElement, Orientation: number, name?: string) {
    let expectWidth = img.naturalWidth;
    let expectHeight = img.naturalHeight;

    if (img.naturalWidth > img.naturalHeight && img.naturalWidth > 800) {
      expectWidth = 800;
      expectHeight = expectWidth * img.naturalHeight / img.naturalWidth;
    } else if (img.naturalHeight > img.naturalWidth && img.naturalHeight > 1200) {
      expectHeight = 1200;
      expectWidth = expectHeight * img.naturalWidth / img.naturalHeight;
    }
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = expectWidth;
    canvas.height = expectHeight;
    if (!ctx) {
      return;
    }
    ctx.drawImage(img, 0, 0, expectWidth, expectHeight);
    let base64 = null;
    // 修复ios
    if (navigator.userAgent.match(/iphone/i)) {
      // alert(expectWidth + ',' + expectHeight);
      // 如果方向角不为1，都需要进行旋转 added by lzk
      if (Orientation !== 1) {
        // alert('旋转处理');
        switch (Orientation) {
          case 6: // 需要顺时针（向左）90度旋转
            // alert('需要顺时针（向左）90度旋转');
            this.rotateImg(img, "left", canvas);
            break;
          case 8: // 需要逆时针（向右）90度旋转
            // alert('需要顺时针（向右）90度旋转');
            this.rotateImg(img, "right", canvas);
            break;
          case 3: // 需要180度旋转
            // alert('需要180度旋转');
            this.rotateImg(img, "180", canvas); // 转两次
            break;
        }
      }

      /*var mpImg = new MegaPixImage(image);
      mpImg.render(canvas, {
          maxWidth: 800,
          maxHeight: 1200,
          quality: 0.8,
          orientation: 8
      });*/
    }
    base64 = canvas.toDataURL("image/jpeg", 0.8);
    // const blob = Common.dataURLtoBlob(base64);
    // (blob as any).name = name;
    console.log(name);
    return base64;
  }

  rotateImg(img: HTMLImageElement, direction: string, canvas: HTMLCanvasElement) {
    // alert(img);
    // 最小与最大旋转方向，图片旋转4次后回到原方向
    const min_step = 0;
    const max_step = 3;
    // var img = document.getElementById(pid);
    if (img == null) { return; }
    // img的高度和宽度不能在img元素隐藏后获取，否则会出错
    const height = img.height;
    const width = img.width;
    // var step = img.getAttribute('step');
    let step = 2;
    if (step == null) {
      step = min_step;
    }
    if (direction === "right") {
      step++;
      // 旋转到原位置，即超过最大值
      step > max_step && (step = min_step);
    } else if (direction === "180") {
      step = 2;
    } else {
      step--;
      step < min_step && (step = max_step);
    }

    // alert(step);
    // img.setAttribute('step', step);
    /*var canvas = document.getElementById('pic_' + pid);
    if (canvas == null) {
        img.style.display = 'none';
        canvas = document.createElement('canvas');
        canvas.setAttribute('id', 'pic_' + pid);
        img.parentNode.appendChild(canvas);
    }  */
    // 旋转角度以弧度值为参数
    const degree = step * 90 * Math.PI / 180;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }
    switch (step) {
      case 0:
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0);
        break;
      case 1:
        canvas.width = height;
        canvas.height = width;
        ctx.rotate(degree);
        ctx.drawImage(img, 0, -height);
        break;
      case 2:
        canvas.width = width;
        canvas.height = height;
        ctx.rotate(degree);
        ctx.drawImage(img, -width, -height);
        break;
      case 3:
        canvas.width = height;
        canvas.height = width;
        ctx.rotate(degree);
        ctx.drawImage(img, -width, 0);
        break;
    }
  }
}
