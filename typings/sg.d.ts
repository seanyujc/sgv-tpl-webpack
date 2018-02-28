export interface ISG {
  loading: {
    show: (options?: { delay: number }) => void;
    hide: () => void;
  };
  lbnDialog: {
    dialog(msg?: string): void;
    conformDialog<T>(mag?: string): Promise<T>;
  };
}

declare module "vue/types/vue" {
  interface Vue {
    $sg: ISG;
  }
}
