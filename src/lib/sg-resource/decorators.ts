import "reflect-metadata";
import { SGVFactory } from "./factory";

export function AutowiredService(target: any, key: string) {
  const t = Reflect.getMetadata("design:type", target, key);
  // if (t.name === "Object") {
  const configAdapter = SGVFactory.createConfigAdapter();
  const service = configAdapter.serviceFactory[getMethodName(key)];
  // property value

  // property getter
  const getter = () => {
    if (service) {
      return service().bind(configAdapter.serviceFactory);
    } else {
      return () => {
        return null;
      };
    }
  };

  // return Reflect.metadata("_" + key, service());
  if (delete target[key]) {
    Object.defineProperty(target, key, {
      get: getter,
      set: undefined,
      enumerable: true,
      configurable: true,
    });
  }
  // }
}

// export function ServiceInjection(serviceName: string) {
//   const configAdapter = SGVFactory.createConfigAdapter();
//   return <T extends { new(...args: any[]): {} }>(constructor: T) => {
//     return class extends constructor {
//       personService = configAdapter.serviceFactory[getMethodName(serviceName)].bind(configAdapter.serviceFactory)();
//     };
//   };
// }

function getMethodName(key: string) {
  const common = SGVFactory.createCommon();
  return "create" + common.upperFirst(key);
}
