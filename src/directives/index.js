import { useIntersectionObserver } from "@vueuse/core";

// 定义懒加载模块
export const lazyPlugin = {
  install(app) {
    //懒加载指令逻辑

    app.directive("img-lazy", {
      mounted(el, binding) {
        // el: 指令绑定的元素
        // binding: binding.value 指令绑定表达式的值
        const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
          if (isIntersecting) {
            // 图片进入视口区
            el.src = binding.value;
            // 图片加载过一次取消监听
            stop();
          }
        });
      },
    });
  },
};
