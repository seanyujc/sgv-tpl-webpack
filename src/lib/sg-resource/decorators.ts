import "reflect-metadata";

const objects: any[] = [];

export function AutowiredService(target: any, key: string) {
  const type = Reflect.getMetadata("design:type", target, key);
  let n: any = null;
  for (const o of objects) {
    if (o instanceof type) {
      n = o;
      break;
    }
  }
  if (n == null) {
    n = new type();
    objects.push(n);
  }
  const getter = () => {
    if (n) {
      return n;
    } else {
      return () => {
        return null;
      };
    }
  };
  if (delete target[key]) {
    Object.defineProperty(target, key, {
      configurable: true,
      enumerable: true,
      get: getter,
      set: undefined,
    });
  }
}

export function Mutations(namespace?: string) {
  // component options should be passed to the callback
  // and update for the options object affect the component

  // tslint:disable-next-line:only-arrow-functions
  return function(
    target: any,
    methodName: string,
    descriptor: PropertyDescriptor,
  ) {
    const original = descriptor.value;
    const name = namespace ? namespace + "/" + methodName : methodName;
    descriptor.value = function commit() {
      const args = [];
      for (let i = 0; i < arguments.length; i++) {
        args[i] = arguments[i];
      }
      if (original.apply(this, args) !== false) {
        (this as any).$store.commit.apply(this, [name].concat(args));
      }
    };
  };
}
