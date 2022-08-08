import { http } from "./http";

export const sendingSave = (data?) => {
  return http.request("post", "/sendingSave", { data });
};
