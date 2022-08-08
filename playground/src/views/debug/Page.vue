<script setup lang="ts">
import { useElRender } from "@/hooks/useElRender";
const { parse2, com, options } = useElRender();
const props = defineProps({
  config: Object
});
</script>
<template>
  <div v-for="(k, i) in Object.keys(props.config.layout)" :key="i">
    <el-divider class="mb-[10px]">{{ k }}模块</el-divider>
    <div v-for="(kk, ii) in parse2(props.config.layout[k])" :key="ii">
      {{ k + (ii + 1) }}
      <ElSelect v-model="com[k + (ii + 1)]" class="w-full">
        <ElOption
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </ElSelect>
    </div>
  </div>
</template>
