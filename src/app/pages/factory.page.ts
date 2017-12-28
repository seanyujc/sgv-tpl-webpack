// SGV-BUILD-PAGE-FAC # NOT DELETE
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
