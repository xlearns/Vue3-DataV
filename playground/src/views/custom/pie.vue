<script setup lang="ts">
const options = {
  series: [
    {
      name: "访问来源",
      type: "pie",
      radius: "95%",
      data: [
        { value: 235, name: "视频广告" },
        { value: 274, name: "联盟广告" },
        { value: 310, name: "邮件营销" },
        { value: 335, name: "直接访问" },
        { value: 400, name: "搜索引擎" }
      ]
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
