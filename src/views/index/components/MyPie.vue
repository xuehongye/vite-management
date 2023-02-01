<template>
  <div class="d-flex jc-between">
    <el-radio-group v-model="selectLabel" size="large" @change="watchPieOption">
      <el-radio-button label="sale_">销量</el-radio-button>
      <el-radio-button label="_money">销售额</el-radio-button>
    </el-radio-group>
    <el-select
      v-model="selectDay"
      class="m-2"
      placeholder="Select"
      size="large"
      @change="watchPieOption"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.name"
        :value="item.value"
      />
    </el-select>
  </div>
  <div id="myPie" style="width: 100%; height: 350px"></div>
</template>

<script setup lang="ts">
import { reactive, ref, toRefs, onMounted, watch } from "vue";
import * as echarts from "echarts";
const props = defineProps<{
  data: IndexItemItf[];
}>();

const state = reactive({
  selectLabel: "_money",
  selectDay: "today",
  options: [
    {
      name: "今天",
      value: "today",
    },
    {
      name: "昨天",
      value: "yesterday",
    },
    {
      name: "前3天",
      value: "yesterday",
    },
    {
      name: "前7天",
      value: "seven_days",
    },
  ],
});

let myChart:echarts.ECharts
const { selectLabel, selectDay, options } = toRefs(state);

watch(
  () => props.data,
  () => {
    watchPieOption();
  }
);

const watchPieOption = () => {
  let key = "";
  if (selectLabel.value === "_money") {
    key = selectDay.value + selectLabel.value;
  } else {
    key = selectLabel.value + selectDay.value;
  }
  // 基于准备好的dom，初始化echarts实例
  if (!myChart) {
    myChart = echarts.init(
      document.getElementById("myPie") as HTMLElement
    );
  }
  const peiData = props.data.map((item:IndexItemItf) => ({
    value: item[key],
    name: item.name,
  }));
  const option = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      right: 10,
      top: 20,
      width: 300,
      height: 100,
      orient: "vertical",
    },
    series: [
      {
        // name: "Access From",
        type: "pie",
        radius: ["40%", "70%"],
        center: ["35%", "45%"],
        data: peiData,
      },
    ],
  };
  myChart.setOption(option);
  // 绘制图表
};
</script>

<style lang="less" scoped></style>
