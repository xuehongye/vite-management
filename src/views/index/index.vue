<template>
  <div class="content">
    <el-scrollbar height="100%">
        <MyPie :data="state.salePie" />
        <MyMap :data="state.saleMap" />
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { getAdminStat } from "@/request/api";
import { reactive, ref, toRefs, onMounted } from "vue";
import MyPie from "./components/MyPie.vue";
import MyMap from "./components/MyMap.vue";

const state = reactive<IndexDataItf>({
  salePie: [],
  saleMap: [],
});

const getAdminStatApi = async () => {
  const res = await getAdminStat();
  if (res.errno === 0) {
    state.salePie = res.data.salePie;
    state.saleMap = res.data.saleMap;
  }
};
onMounted(() => {
  getAdminStatApi();
});
</script>

<style lang="less" scoped>
.content {
  height: calc(100% - 80px);
}
</style>
