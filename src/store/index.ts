import { createStore } from "vuex";
import { App } from "vue";
import { getAdminInfoApi } from "@/request/api";

const store = createStore<IState>({
  state() {
    return {
      menus: [],
    };
  },
  getters: {
    getNewMenus(state) {
      // 获取旧菜单数据
      const menus = state.menus;
      let newMenus: IMewMenus = {};
      for (let i = 0; i < menus.length; i++) {
        if (menus[i].parentId === 0) {
          // 一级菜单
          newMenus[menus[i].id] = {
            ...menus[i],
            children: newMenus[menus[i].id]?.children || [],
          };
        } else {
          // 二级菜单
          let parentId = menus[i].parentId; // 对应一级菜单的id
          newMenus[parentId] = newMenus[parentId] || {};
          newMenus[parentId].children = newMenus[parentId]?.children || [];
          newMenus[parentId].children?.push(menus[i]);
        }
      }
      return newMenus;
    },
  },
  mutations: {
    updateMenus(state, menus) {
        state.menus = menus
    },
  },
  actions: {
    getAdminInfo({ commit }) {
      // 获取用户信息
      return new Promise(async (resolve, reject) => {
        const res = await getAdminInfoApi();
        if (res.code === 200) {
          // 将menus 数据 res.data.menus 存储到 vuex 中
          commit("updateMenus", res.data.menus);
          resolve(res.code);
        } else {
          reject(res.code);
        }
      });
    },
  },
  modules: {},
});

export const initStore = (app: App<Element>) => {
  app.use(store);
};
export default store;
