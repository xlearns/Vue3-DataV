<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useElRender } from "@/hooks/useElRender";
import custom from "@/views/custom";
const { com, options } = useElRender();
const props = withDefaults(
  defineProps<{
    config: Record<string, unknown>;
  }>(),
  {}
);
const render = ref();
function init() {
  const { k, index } = props.config;
  const ikey = k + (index + 1);
  const ckey = com.value[ikey];
  if (!ckey) {
    return;
  }
  const { key } = options.filter(v => {
    return v.value == ckey;
  })[0];
  render.value = !key || key == "default" ? void 0 : custom[key];
}
onMounted(() => {
  init();
});
</script>
<template>
  <div class="h-full w-full" v-if="!render">
    <ElBorderBox8>
      <div class="w-full h-full flex justify-center items-center text-[#fff]">
        默认占位
      </div>
    </ElBorderBox8>
  </div>
  <template v-else>
    <component :is="render" />
  </template>
</template>
