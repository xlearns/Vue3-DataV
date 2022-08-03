import { http } from "./http";

export const getTestGet = (data?) => {
  return http.request("get", "/api/login", { data });
};
export const getTestPost = (data?) => {
  return http.request("post", "/api/login", { data });
};
