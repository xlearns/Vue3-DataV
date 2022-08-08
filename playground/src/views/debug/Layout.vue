<script setup lang="ts">
import { ref } from "vue";
import type { TConfig } from "./types";
import { useElRender } from "@/hooks/useElRender";

const { config } = useElRender();
withDefaults(
  defineProps<{
    keys: (string | number)[];
  }>(),
  {
    keys: () => []
  }
);

const form = ref<TConfig<typeof config>>(config);

function i18Fn(str) {
  switch (str) {
    case "size":
      return "页面大小";
    case "header":
      return "页面头部区";
    case "content":
      return "页面整体比例";
    case "layout":
      return "页面布局";
  }
}
</script>
<template>
  <div v-for="(item, index) in keys" :key="index">
    <span>{{ i18Fn(item) }}</span>
    <div class="pl-10" v-for="(t, i) in Object.keys(form[item])" :key="i">
      <span>{{ t }}</span>
      <el-input v-model="config[item][t]" />
    </div>
  </div>
</template>
