<template>
  <div class="homepage_container">
    <div class="homepage_header">叩丁狼电商运营平台</div>
    <div class="homepage_menu">
      <el-scrollbar height="100%">
        <el-menu
          active-text-color="#ffd04b"
          background-color="#293f57"
          class="el-menu-vertical-demo"
          text-color="#fff"
          unique-opened
          :default-openeds="defalutOpens"
          :default-active="defalutActive"
          router
        >
          <el-menu-item index="/">首页</el-menu-item>
          <el-sub-menu
            :index="menu.name"
            v-for="menu in newMenus"
            :key="menu.id"
          >
            <template #title>
              <span>{{ menu.title }}</span>
            </template>
            <template v-for="submenu in menu.children" :key="submenu.id">
              <el-menu-item
                :index="`/${menu.name}/${submenu.name}`"
                v-if="!submenu.hidden"
                >{{ submenu.title }}</el-menu-item
              >
            </template>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <div class="homepage_content">
      <div class="homepage_breadcrumb" v-if="route.path">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item v-for="item in breadcrumbs" :key="item">{{
            item
          }}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider />
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, Ref, ref, toRefs, computed, watch, onMounted } from "vue";
import { useStore } from "vuex";
import { RouteLocationMatched, RouterView, useRoute } from "vue-router";
let store = useStore();
const route = useRoute();
const state = reactive<{
  defalutOpens: string[];
  defalutActive: string;
  breadcrumbs: string[];
}>({
  defalutOpens: ["/"],
  defalutActive: "",
  breadcrumbs: [],
});
const newMenus = computed<IMewMenus>(() => store.getters.getNewMenus);

const pathChange = () => {
  state.breadcrumbs = [];
  let paths = route.path.split("/");
  paths.shift();
  for (let key in newMenus.value) {
    let a = newMenus.value[key];
    if (a.name === paths[0]) {
      state.breadcrumbs.push(a.title);
      a.children?.map((item) => {
        if (item.name == paths[1]) {
          state.breadcrumbs.push(item.title);
        }
      });
    }
  }
};

watch(
  () => route.path,
  () => {
    pathChange();
  }
);

onMounted(() => {
  state.defalutOpens = [route.path];
  state.defalutActive = route.path;
  pathChange();
});
let { defalutOpens, defalutActive, breadcrumbs } = toRefs(state);
</script>

<style lang="less" scoped>
.homepage_container {
  height: 100%;
  position: relative;
  .homepage_header {
    height: 70px;
    background-color: #409eff;
    color: #fff;
    font-size: 24px;
    font-weight: 600;
    line-height: 70px;
    padding: 0 20px;
  }
  .homepage_menu {
    position: absolute;
    top: 70px;
    left: 0;
    bottom: 0;
    width: 250px;
    background: #293f57;
  }
  .homepage_content {
    position: absolute;
    top: 70px;
    right: 0;
    left: 250px;
    bottom: 0;
    padding: 20px 0 0 20px;
  }
}
:deep(.el-divider--horizontal) {
  margin: 14px 0;
}
</style>
