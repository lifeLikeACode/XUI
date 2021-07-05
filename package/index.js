import Button from "./components/button/index";
import Swiper from "./components/swiper/index";
import SwiperItem from "./components/swiperItem/index";
import dialog from "./components/dialog/index";
// import Dialog from "./components/dialog/src/func-dialog.js";
import icon from "./components/icon/index";
import groupButton from "./components/groupButton/index";
import row from "./components/row/index";
import col from "./components/col/index";
import scroll from "./components/scroll/index";
import Switch from "./components/switch/index";

import Picker from "./components/picker/index";
import ColorPicker from "./components/color-picker/index";
const components = [
  Button,
  Swiper,
  SwiperItem,
  dialog,
  icon,
  groupButton,
  row,
  col,
  scroll,
  Picker,
  Switch,
  ColorPicker
];

const install = Vue => {
  if (install.installed) return false;
  components.map(component => {
    return Vue.component(component.name, component);
  });
  Vue.prototype.$dialog = dialog;
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}
document.body.addEventListener("touchstart", function() {});
export default {
  install,
  Button,
  Swiper,
  SwiperItem,
  dialog,
  icon,
  groupButton,
  row,
  col,
  scroll,
  Picker,
  Switch,
  ColorPicker
};
