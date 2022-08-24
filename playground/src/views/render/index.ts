/**
 * @description: left or center or right is null Array render default component
 * @example: import leftOne from "./1/one.vue";
 */
import { ref, watchEffect } from "vue";
import { ToArray } from "@/utils";
import df from "@/views/default/index.vue";
import header from "@/views/header/index.vue";
import { useElRender } from "@/hooks/useElRender";
const { config } = useElRender();

let res = ref({});
watchEffect(() => {
  let { content, layout } = config.value;
  res.value = createLayoutBlock(content.container);
  let res_len = Object.keys(res.value).length - 2;
  let lay_len = Object.keys(layout).length;
  if (res_len > lay_len) {
    config.value.layout = {
      ...layout,
      [res_len]: [1, 2]
    };
  }
});

export default res;

function createLayoutBlock(r) {
  let flat = {};
  let len = ToArray(r) || [];
  len.forEach((v, i) => {
    flat[i + 1] = [];
  });

  return {
    ...flat,
    default: df,
    header: header
  };
}
