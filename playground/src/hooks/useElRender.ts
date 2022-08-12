import { com as CONFIG_COM, config as CONFIG } from "../../config.json";
import BASE from "../../base.json";

import { ref, watchEffect } from "vue";

const isdev = ref(true);

const isLoadConfig = !!Object.keys(CONFIG_COM).length;

const config = ref(isLoadConfig ? CONFIG : BASE);

const com = ref(isLoadConfig ? CONFIG_COM : {});

function parse2(arr) {
  try {
    if (!Array.isArray(arr)) {
      arr = arr.split(",").filter(v => v);
    }
    return arr;
  } catch (e) {
    console.error(e);
  }
}

const options = [
  {
    value: "1",
    key: "default",
    label: "默认占位"
  },
  {
    value: "2",
    key: "table",
    label: "表格"
  },
  {
    value: "3",
    key: "pie",
    label: "饼图"
  },
  {
    value: "4",
    key: "bar",
    label: "柱状图"
  }
];

function parse(arr) {
  try {
    if (!Array.isArray(arr)) {
      arr = arr.split(",").filter(v => v);
    }
    return arr.map(item => item + "fr").join(" ");
  } catch (e) {
    console.error(e);
  }
}

watchEffect(() => {
  const { DEV } = import.meta.env;
  isdev.value = DEV;
});
export const useElRender = function () {
  return {
    isdev,
    parse,
    parse2,
    config,
    com,
    options
  };
};
