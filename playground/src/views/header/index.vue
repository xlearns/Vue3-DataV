<script setup lang="ts">
interface props {
  title: string;
}
defineProps<props>();
</script>

<template>
  <div class="h-[92px] flex justify-center items-center">
    <ElScanBox>
      <div class="text-light-500 text-[20px] h-full">
        {{ title }}
      </div>
    </ElScanBox>
  </div>
</template>

<style scoped></style>
