<script setup lang="ts">
const options = {
  grid: {
    top: "10%",
    left: "10%",
    right: "10%",
    bottom: "10%"
  },
  xAxis: {
    show: false,
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  },
  yAxis: {
    show: false,
    type: "value"
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: "bar",
      showBackground: true,
      backgroundStyle: {
        color: "rgba(180, 180, 180, 0.2)"
      }
    }
  ]
};
</script>
<template>
  <div class="h-full">
    <ElBorderBox1>
      <ElEcharts :animation="{ open: true }" :options="options" open />
    </ElBorderBox1>
  </div>
</template>
