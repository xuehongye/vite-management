<template>
  <div id="myMap" style="width: 100%; height: 700px"></div>
</template>

<script setup lang="ts">
import { reactive, ref, toRefs, watch } from "vue";
import * as echarts from "echarts";
import china from "@/data/china.json";
echarts.registerMap("china", china as any);

const props = defineProps<{
  data: {}[];
}>();

let myMap: echarts.ECharts;

watch(
  () => props.data,
  () => {
    const data = props.data.map(
      (item: { [key: string]: number | string  }) => ({
        value: item.saleNum,
        name: item.areaName,
      })
    );
    if (!myMap) {
      myMap = echarts.init(document.getElementById("myMap") as HTMLElement);
    }
    const option = {
      tooltip: {
        show: true,
        formatter: '{b}<br />销量: {c}',
        backgroundColor: 'rgba(50,50,50,.7)',
        textStyle: {
            color: '#fff'
        }
      },
      visualMap: {
        type: 'continuous',
        min: 0,
        max: 1000000,
        // 两个手柄对应的数值是 4 和 15
        // range: [4, 15],
        calculable: true,
        inRange: {
            color: ['#121122', 'rgba(3,4,5,0.4)', 'red']
        }
      },
      series: {
        type: "map",
        map: "china",
        itemStyle: {
          borderColor: "#fff",
        },
        emphasis: {
          label: {
            show: false,
          },
          itemStyle: {
            areaColor: "#8686d2",
          },
        },
        data,
      },
    };
    myMap.setOption(option);
  }
);
</script>

<style lang="less" scoped></style>
