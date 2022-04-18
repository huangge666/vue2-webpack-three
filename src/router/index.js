// import Vue from "vue";
// import Router from "vue-router";
// Vue.use(Router);

// export default new Router({
//   routes: [
//     {
//       path: "/",
//       name: "Home",
//       // component: () => import('@/views/Home'),
//       component: (resolve) => require(["@/views/Home.vue"], resolve),
//     },
//     {
//       path: "/demo",
//       name: "demo",
//       component: (resolve) => require(["@/views/demo.vue"], resolve),
//     },
//   ],
// });

import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

let siteRoutes = [];
function importAll(r) {
  //r 参数自带两个处理属性一个keys 一个是resolve 这里用的keys 具体看官网APi: context module API
  r.keys().forEach((key) => {
    let path = key.split(".")[1]; //key 就是带了./的文件名 比如我这里打印出来是./About ./Home ./Test 这样你就懂path 和name为什么这样写
    path.indexOf("Home") > -1 ? (path = "/") : ""; // home页面会被解析为/home，/ 访问为空白，所以做个判断path转为 / 。
    siteRoutes.push({
      path: path,
      name: path.substring(1),
      component: () => r(key),
    });
  });
}

importAll(require.context("../views/", false, /\.vue$/, "lazy")); // 第二个参数指是否使用子目录 第四个参数是指是否异步 lazy/sync
const routes = [...siteRoutes];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;
