import JSON from "../../config.json";
import { ref } from "vue";
const config = ref(JSON);
const com = ref({});
//字符串转换数组
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

export const useElRender = function () {
  return {
    parse,
    parse2,
    config,
    com,
    options
  };
};
