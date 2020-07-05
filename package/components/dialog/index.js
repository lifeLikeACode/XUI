import Dialog from "./src/func-dialog";

Dialog.install = function(Vue) {
  Vue.component(Dialog.name, Dialog);
};
export default Dialog;
