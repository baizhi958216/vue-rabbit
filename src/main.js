import "@/styles/common.scss";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import { useIntersectionObserver } from "@vueuse/core";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");

app.directive("img-lazy", {
  mounted(el, binding) {
    // el: 指令绑定的元素
    // binding: binding.value 指令绑定表达式的值
    useIntersectionObserver(el, ([{ isIntersecting }]) => {
      if (isIntersecting) {
        // 图片进入视口区
        el.src = binding.value;
      }
    });
  },
});
