// SGV-BUILD-PAGE-FAC # NOT DELETE
// 'Home' PAGE FACTORY START
export function homePagePreloading(): Promise<any> {
  return new Promise((resolve) => {
    require.ensure([], (require) => {
      const home = require("./home/home.module").default;
      resolve(home);
    });
  });
}
// 'Home' PAGE FACTORY END
// 'Login' PAGE FACTORY START
export function loginPagePreloading(): Promise<any> {
  return new Promise((resolve) => {
    require.ensure([], (require) => {
      const login = require("./login/login.module").default;
      resolve(login);
    });
  });
}
// 'Login' PAGE FACTORY END