import Vue from "vue";
import { IConfigAdapter } from "../src/lib/sg-resource";

export interface ISG {
  configAdapter: IConfigAdapter;
}
declare module "vue/types/vue" {
  interface Vue {
    $sg: ISG;
    vm: Vue;
    _self: Vue;
  }
  interface VueConstructor {
    $sg: ISG;
    vm: Vue;
  }
}

declare module "vue/types/options" {
  interface ComponentOptions<V extends Vue> {
    functional?: boolean;
  }
}
