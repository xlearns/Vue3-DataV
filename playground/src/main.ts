import "virtual:windi.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "./style/index.scss";

import datav from "datav";

// test
// import * as datav from "../../dist/index.full.mjs";
// import "../../dist/index.full.css";

const app = createApp(App);
app.use(ElementPlus);
app.use(router);
app.use(datav);
app.mount("#app");
