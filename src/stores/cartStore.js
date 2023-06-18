import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useUserStore } from "./userStore";
import { insertCartAPI, findNewCartListAPI, delCartAPI } from "@/apis/cart";
export const useCartStore = defineStore(
  "cart",
  () => {
    const userStore = useUserStore();
    const isLogin = computed(() => userStore.userInfo.token);
    // 1. 定义state - cartList
    const cartList = ref([]);

    const updateNewList = async () => {
      const res = await findNewCartListAPI();
      cartList.value = res.result;
    };

    const addCart = async (goods) => {
      const { skuId, count } = goods;
      if (isLogin.value) {
        await insertCartAPI({ skuId, count });
        updateNewList();
      } else {
        const item = cartList.value.find((item) => goods.skuId === item.skuId);
        if (item) {
          item.count++;
        } else {
          cartList.value.push(goods);
        }
      }
    };
    const delCart = async (skuId) => {
      if (isLogin.value) {
        await delCartAPI([skuId]);
        updateNewList();
      } else {
        const idx = cartList.value.findIndex((item) => skuId === item.skuId);
        cartList.value.splice(idx, 1);
      }
    };

    // 计算购物车数量和总价
    const allCount = computed(() =>
      cartList.value.reduce((a, c) => a + c.count, 0)
    );
    const allPrice = computed(() =>
      cartList.value.reduce((a, c) => a + c.count * c.price, 0)
    );

    // 单选功能
    const singleCheck = (skuId, selected) => {
      const item = cartList.value.find((item) => item.skuId === skuId);
      item.selected = selected;
    };

    // 是否全选
    const isAll = computed(() => cartList.value.every((item) => item.selected));

    // 全选
    const allCheck = (selected) => {
      cartList.value.forEach((item) => (item.selected = selected));
    };

    // 已选择数量
    const selectedCount = computed(() =>
      cartList.value
        .filter((item) => item.selected)
        .reduce((a, c) => a + c.count, 0)
    );

    // 已选择商品价钱合计
    const selectedPrice = computed(() =>
      cartList.value
        .filter((item) => item.selected)
        .reduce((a, c) => a + c.count * c.price, 0)
    );

    // 清除购物车
    const clearCart = () => {
      cartList.value = [];
    };

    return {
      cartList,
      addCart,
      delCart,
      allCount,
      allPrice,
      singleCheck,
      isAll,
      allCheck,
      selectedCount,
      selectedPrice,
      clearCart,
    };
  },
  {
    persist: true,
  }
);
