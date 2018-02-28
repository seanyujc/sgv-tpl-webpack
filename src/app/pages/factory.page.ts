// SGV-BUILD-PAGE-FAC # NOT DELETE
// 'Foo' PAGE FACTORY START
export function fooPagePreloading(): Promise<any> {
  return new Promise((resolve) => {
    require.ensure([], (require) => {
      const foo = require("./foo/foo.vue").default;
      resolve(foo);
    });
  });
}
// 'Foo' PAGE FACTORY END
// 'Home' PAGE FACTORY START
export function homePagePreloading(): Promise<any> {
  return new Promise((resolve) => {
    require.ensure([], (require) => {
      const home = require("./home/home.vue").default;
      resolve(home);
    });
  });
}
// 'Home' PAGE FACTORY END
