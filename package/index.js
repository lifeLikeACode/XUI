import button from "./components/button/index";
import swiper from "./components/swiper/index";
import swiperItem from "./components/swiperItem/index";
import dialog from "./components/dialog/index";
import Dialog from "./components/dialog/src/func-dialog.js";
import icon from "./components/icon/index";
import groupButton from "./components/groupButton/index";
import row from "./components/row/index";
import col from "./components/col/index";
import scroll from "./components/scroll/index";
import picker from "./components/picker/index";
const components = [
  button,
  swiper,
  swiperItem,
  dialog,
  icon,
  groupButton,
  row,
  col,
  scroll,
  picker
];

const install = Vue => {
  if (install.installed) return false;
  components.map(component => {
    return Vue.component(component.name, component);
  });
  Vue.prototype.$dialog = Dialog;
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}
document.body.addEventListener("touchstart", function() {});
export default {
  install,
  button,
  swiper,
  swiperItem,
  dialog,
  icon,
  groupButton,
  row,
  col,
  scroll,
  picker
};
