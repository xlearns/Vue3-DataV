<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useElRender } from "@/hooks/useElRender";
import render from "./render";
const { parse, config, parse2 } = useElRender();

const headerHeight = 92;

const mbHeight = 16;

const contentHeight = ref<string | number>(config.value.size.height);

function getContentHeight() {
  contentHeight.value =
    Number(config.value.size.height) - headerHeight - mbHeight;
}

defineExpose(config.value);

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
      width: config.size.width,
      height: config.size.height
    }"
  >
    <div class="bg-[#0d1b65] w-full h-full">
      <component :is="render['header']" :title="config.header.title" />
      <div
        :style="{
          height: `${contentHeight}px`,
          gridTemplateColumns: parse(config.content.container)
        }"
        class="overflow-hidden min-h-0 grid gap-2 mx-[24px] box-border"
      >
        <div
          class="grid gap-2"
          v-for="k in Object.keys(config.layout)"
          :key="k"
          :style="{
            height: `${contentHeight}px`,
            gridTemplateRows: parse(config.layout[k])
          }"
        >
          <template
            v-if="
              parse2(config.layout[k]) && parse2(config.layout[k]).length > 0
            "
          >
            <div
              v-for="(item, index) in parse2(config.layout[k])"
              :key="index"
              class="overflow-hidden"
            >
              <component :is="ElRender(k, index)" :config="{ k, index }" />
            </div>
          </template>
        </div>
      </div>
    </div>
  </ElFullScreen>
</template>
