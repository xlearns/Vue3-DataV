<script setup lang="ts">
const tableData = Array.from({length:100},(v,i)=>{
  return  {
    date: "2016-05-01",
    name: "Tom"+(i+1),
    address: "No. 189, Grove St, Los Angeles"
  }
})
</script>

<template>
  <div class="bg-[#fff] h-full">
    <ElBorderBox1 />
    <!-- <el-table :data="tableData" style="height:100%;width: 100%">
      <el-table-column prop="date" label="Date" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="address" label="Address" />
    </el-table> -->
  </div>
</template>
