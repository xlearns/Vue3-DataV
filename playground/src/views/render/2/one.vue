<script setup lang="ts">
const tableData = Array.from({ length: 100 }, (v, i) => {
  return {
    date: "2016-05-01",
    name: "Tom" + (i + 1),
    address: "No. 189, Grove St, Los Angeles"
  };
});
const type = ["address", "date", "name"];
const headerData = type.map(item => {
  return {
    prop: item,
    label: item
  };
});
</script>

<template>
  <div class="h-full">
    <ElBorderBox2>
      <div class="flex justify-center items-center w-full h-full">
        <ElTableBox :tableData="tableData" :headerData="headerData" />
      </div>
    </ElBorderBox2>
  </div>
</template>
