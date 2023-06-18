import { ref } from "vue";
import { getCategoryAPI } from "@/apis/layout";
import { defineStore } from "pinia";

export const useCategoryStore = defineStore("category", () => {
  // 导航列表
  const categoryList = ref([]);
  // 获取导航数据
  const getCategory = async () => {
    const res = await getCategoryAPI();
    categoryList.value = res.result;
  };
  return { categoryList, getCategory };
});
