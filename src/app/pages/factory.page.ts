// SGV-BUILD-PAGE-FAC # NOT DELETE
// 'Home' PAGE FACTORY START
export function homePagePreloading(): Promise<any> {
  return import("./home/home.vue").catch(error => {
    return dealOccurred(error, "Home");
  });
}
// 'Home' PAGE FACTORY END
// 'Login' PAGE FACTORY START
export function loginPagePreloading(): Promise<any> {
  return import("./login/login.vue").catch(error => {
    return dealOccurred(error, "Login");
  });
}
// 'Login' PAGE FACTORY END
/**
 * 处理错误
 */
function dealOccurred(error: any, pageName = "") {
  location.href = (window as any).__SWNextFullPath;
}
