
/**
 * 设置路由跳转参数传递
 * @param name  //路由地址 （必传参数）
 * @param params //路由参数（可选参数）
 * @param query //url？后面参数（可选参数）
 * @param router // router对象（必传参数）
 * @param route // route对象（必传参数）
 * @param store // store对象（必传参数）
 * 例子
// routerPush({
//     name: 'activity-course-uuid-details-demo1',
//     params: { uuid: '59bb1bc12926418285a06b8a8c5df444', id: '2334' },
//     query: { name: 'zhuao' },
//     router: this.$router,
//     route: this.$route,
//     store: this.$store
//   });
 */

export function routerPush (e) {
  // 在参数中增加xenv
  e.router.push({
    name: e.name,
    params: e.params ? e.params : e.route.params,
    query: Object.assign({}, e.query, e.store.state.app.xenv)
  });
}

/**
 * 设置路由跳转参数传递
 * @param name  //路由地址 （必传参数）
 * @param params //路由参数 （可选参数）
 * @param query //url？后面参数 （可选参数）
 * @param router // router对象 （必传参数）
 * @param route // route对象 （必传参数）
 * @param store // store对象 （必传参数）
 */

export function routerReplace (e) {
  e.router.replace({
    name: e.name,
    params: e.params ? e.params : e.route.params,
    query: Object.assign({}, e.query, e.store.state.app.xenv)
  });
}

/**
 * 外链跳转
 * @param url //外链完整地址 （必传参数）
 */
export function urlHref (url) {
  window.location.href = url;
}

/**
 * 外链replace跳转
 * @param url //外链完整地址 （必传参数）
 */

export function urlReplace (url) {
  window.location.replace(url);
}

/**
 * 服务端修改路由
 * @param e
 */

export function redirectUrl (e) {
  let query = Object.assign({}, e.query, e.store.state.app.xenv);
  let queryStr = '';
  for (let item in query) {
    queryStr += `${item}=${query[item]}&`;
  }
  queryStr = queryStr.replace(/\s+/g, '').substring(0, queryStr.length - 1);
  e.redirect(`${e.url}?${queryStr}`);
}
