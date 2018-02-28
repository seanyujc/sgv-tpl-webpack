import * as moment from "moment";
import Vue from "vue";

// 首字母大写
Vue.filter("capitalize", (value: string) => {
  if (!value) { return ""; }
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
});

// 时期格式化
Vue.filter("date", (value: Date | number | string, format: string) => {
  const m = moment(value);
  if (!m.isValid()) {
    return "";
  }
  return m.format(format);
});

// 金额保留两位小数
Vue.filter("keepTwoNum", (value: number) => {
  if (typeof value !== "number") {
    return "0.00";
  }
  return (value * .01).toFixed(2).toString();
});

// 格式化后的金额
Vue.filter("formatPrice", (value: number) => {
  if (typeof value !== "number") {
    return "&yen;<i style=\"font-size: 0.18rem;\">0.00</i>";
  }
  const price = (value / 100).toFixed(2);
  const strPrice = price.toString();
  const strRes = strPrice.split(".");
  return `&yen;${strRes[0]}.<i style="font-size: 0.18rem;">${strRes[1]}</i>`;
});
