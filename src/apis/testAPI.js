import httpInstance from "@/utils/http";

export function getCategary() {
  return httpInstance({
    url: "home/category/head",
  });
}
