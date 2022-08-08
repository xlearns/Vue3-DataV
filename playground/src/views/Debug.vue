<script setup lang="ts">
import { useElRender } from "@/hooks/useElRender";
import { sendingSave } from "@/utils/api";
import Layout from "./debug/Layout.vue";
import Page from "./debug/Page.vue";
import { onMounted, ref } from "vue";
import Home from "./Home.vue";
const { config, com } = useElRender();
const dom = ref(null);
const keys = ref([]);
const state = ref(true);
const drawer = ref(true);
const activeName = ref("first");

function show() {
  drawer.value = !drawer.value;
}
function parse(obj) {
  const k = Object.keys(obj);
  const res = {};
  k.forEach(v => {
    res[v] = JSON.stringify(obj[v]);
  });

  return res;
}
function save() {
  sendingSave(parse({ config: config.value, com: com.value })).then(res => {
    console.log(res);
  });
}
function yes() {
  state.value = false;
  setTimeout(() => {
    state.value = true;
  });
}

onMounted(() => {
  keys.value = Object.keys(dom.value);
});
</script>

<template>
  <Home ref="dom" v-if="state" />
  <ElButton class="absolute text-[#fff] top-0 z-1000" @click="show"
    >唤出调试面板</ElButton
  >

  <ElDrawer
    v-model="drawer"
    title="I am the title"
    :with-header="false"
    size="70%"
  >
    <div class="flex justify-center items-center">调试面板</div>
    <!-- <div class="flex items-center">
      <span class="mr-10px">开启拖拽模式</span><ElCheckbox />
    </div> -->
    <ElTabs v-model="activeName" class="demo-tabs">
      <ElTabPane label="布局设置" name="first">
        <Layout :keys="keys" />
      </ElTabPane>

      <ElTabPane label="页面" name="two">
        <Page :config="config" />
      </ElTabPane>
    </ElTabs>

    <div class="flex justify-center items-center mt-30">
      <ElButton type="primary" @click="yes">刷新</ElButton>
      <ElButton type="primary" @click="save">保存</ElButton>
    </div>
  </ElDrawer>
</template>

<style scoped></style>
