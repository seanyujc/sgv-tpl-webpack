export interface IOptions {
  title?: string;
  content?: string;
  maskTransition?: string;
  dialogTransition?: string;
  maskZIndex?: number | string;
  hideOnBlur?: boolean;
  onShow?: () => void;
  onHide?: () => void;
}

export interface IAlertOptions extends IOptions {
  buttonText: string;
}

export interface IConfirmOptions extends IOptions {
  show?: boolean;
  showInput?: boolean;
  placeholder?: string;
  theme?: string;
  confirmText?: string;
  cancelText?: string;
  inputAttrs?: any;
  onCancel?: () => void;
  onConfirm?: (value: string) => void;
  setInputValue?: (value: string) => void;
}

export interface vux {
  alert: {
    show: (options: IAlertOptions) => void;
    hide: () => void;
  }
  confirm: {
    show: (options: IConfirmOptions) => void;
    hide: () => void,
  }
}

declare module "vue/types/vue" {
  interface Vue {
    $vux: vux;
  }
}
