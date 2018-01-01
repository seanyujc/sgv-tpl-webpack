// SGV-BUILD-PAGE-FAC # NOT DELETE
// 'Login' PAGE FACTORY START
export function loginPagePreloading(): Promise<any> {
  return new Promise((resolve) => {
    require.ensure([], (require) => {
      const login = require("./login/login.vue").default;
      resolve(login);
    });
  });
}
// 'Login' PAGE FACTORY END
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
