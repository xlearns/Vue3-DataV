<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useElRender } from "@/hooks/useElRender";
import render from "./render";
const { parse, config } = useElRender();
const { header, size, layout, content } = config;
const { title } = header;
const { height, width } = size;
const { container } = content;
const headerHeight = 92;
const mbHeight = 16;
const contentHeight = ref<string | number>(height);
function getContentHeight() {
  contentHeight.value = Number(height) - headerHeight - mbHeight;
}
onMounted(() => {
  getContentHeight();
});

function ElRender(type: string, num: number) {
  return render[type][num] || render["default"];
}
</script>
<template>
  <ElFullScreen
    :options="{
      width: width,
      height: height
    }"
  >
    <div class="bg-[#0d1b65] w-full h-full">
      <component :is="render['header']" :title="title" />
      <div
        :style="{
          height: `${contentHeight}px`,
          gridTemplateColumns: parse(container)
        }"
        class="overflow-hidden min-h-0 grid gap-2 mx-[24px] box-border"
      >
        <div
          class="grid gap-2"
          v-for="k in Object.keys(layout)"
          :key="k"
          :style="{
            height: `${contentHeight}px`,
            gridTemplateRows: parse(layout[k])
          }"
        >
          <template v-if="layout[k] && layout[k].length > 0">
            <div
              v-for="(item, index) in layout[k]"
              :key="index"
              class="overflow-hidden"
            >
              <component :is="ElRender(k, index)" />
            </div>
          </template>
        </div>
      </div>
    </div>
  </ElFullScreen>
</template>
