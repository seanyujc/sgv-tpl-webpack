
declare module "vux" {
  import Vue, { PluginFunction, Component } from "vue";

  export const Alert: Component;
  export const Scroller: Component;
  export const AlertPlugin: {
    install: PluginFunction<never>
  }
  export const ConfirmPlugin: {
    install: PluginFunction<never>
  }
}

declare module "vux/src/plugins/confirm/index.js" {
  import Vue, { PluginFunction, Component } from "vue";

  const ConfirmPlugin: {
    install: PluginFunction<never>
  }
  export default ConfirmPlugin;
}
