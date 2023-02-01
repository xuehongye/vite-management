import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
// import Vue from 'vue'
// Vue.use(VueRouter)
// Vue2 use: 调用的是参数上的 install 方法，或者是直接调用参数 Vue.prototype.$router/$route

import { App } from "vue";
import store from "@/store";
import Cookies from "js-cookie";

const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/login.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(), // 模式
  routes, // 路由配置
});

// 根据getters里面的菜单对象动态生成路由规则
const genRoutes = () => {
  const menus = store.getters.getNewMenus;
  //   const newRoutes: RouteRecordRaw[] = [];
  // 循环菜单对象
  for (let key in menus) {
    router.addRoute({
      path: "/" + menus[key].name,
      name: menus[key].name,
      component: () => import("@/views/homePage/homePage.vue"),
      meta: {
        title: menus[key].title,
      },
      redirect: "/" + menus[key].name + "/" + menus[key].children[0].name,
      children: menus[key].children.map((item: MenuObj) => ({
        path: item.name,
        name: item.name,
        component: () => import(`@/views/${menus[key].name}/${item.name}.vue`),
        meta: {
          title: item.title,
        },
      })),
    });
  }
  router.addRoute({
    path: "/",
    name: "homePage",
    component: () => import("@/views/homePage/homePage.vue"),
    redirect: "/index",
    children: [
      {
        path: "index",
        name: "index",
        component: () => import("@/views/index/index.vue"),
        meta: {
          title: "首页",
        },
      },
    ],
  });
  router.addRoute({ path: "/:pathMatch(.*)*", redirect: "/login" });
};

router.beforeEach((to, from, next) => {
  // 1.token 存在 && vuex 里面的 menus (权限列表) 为空
  const token = Cookies.get("token");
  if (token && store.state.menus.length === 0) {
    // 获取用户信息 (异步)
    store.dispatch("getAdminInfo").then(() => {
      genRoutes();
      next(to);
    });
  } else if (
    token &&
    store.state.menus.length !== 0 &&
    from.path === "/login" &&
    to.path === "/homepage"
  ) {
    // 第一次登录
    genRoutes();
    next("/index");
  } else if (!token && to.path !== "/login") {
    next("/login");
  } else if (token && to.path === "/login") {
    next(from);
  } else {
    next();
  }
});

// export default router
export const initRouter = (app: App<Element>) => {
  app.use(router);
};
