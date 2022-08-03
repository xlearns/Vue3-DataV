import config from "../../config.json";

function parse(arr) {
  return arr.map(item => item + "fr").join(" ");
}
export const useElRender = function () {
  return {
    parse,
    config
  };
};
