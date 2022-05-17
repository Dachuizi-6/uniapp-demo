import App from "./App";

// #ifndef VUE3
import Vue from "vue";

import "./style/global.scss";

import * as filters from "./filter";

Vue.config.productionTip = false;
App.mpType = "app";
const app = new Vue({
  ...App,
});
app.$mount();
// #endif

// #ifdef VUE3
import { createSSRApp } from "vue";
export function createApp() {
  const app = createSSRApp(App);
  return {
    app,
  };
}
// #endif

// 注册过滤器
// console.log(filters);
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});
