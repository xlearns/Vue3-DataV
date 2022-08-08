import leftOne from "./left/one.vue";
import leftTwo from "./left/two.vue";
import leftThree from "./left/one.vue";

import centerOne from "./center/one.vue";
import rightOne from "./left/one.vue";

import df from "./default/index.vue";

import header from "./header/index.vue";
export default {
  left: [leftOne, leftTwo, leftThree],
  center: [centerOne, leftOne],
  right: [leftOne, leftOne, rightOne],
  default: df,
  header: header
};
