import Dialog from "./src/dialog.vue";
import dialog from "./src/func-dialog.js";

export default (Vue) => {
	Vue.prototype.$dialog = dialog;
	Vue.component(Dialog.name, Dialog);
};
