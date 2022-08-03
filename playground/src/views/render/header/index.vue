<script setup lang="ts">
interface props {
  title: string;
}
defineProps<props>();
</script>

<template>
  <div class="h-[92px] flex justify-center items-center">
    <div class="text-light-500 text-[20px]">{{ title }}</div>
  </div>
</template>

<style scoped></style>
