import Vue from "vue";
import Dialog from "./dialog";

let seed = 0;
const instances = [];
const noop = function() {};
// 生成一个未挂载的组件
const DialogConstructor = Vue.extend(Dialog);
const dialog = (options = {}) => {
  const {
    onOk = noop,
    onCancel = noop,
    showCancelButton = true,
    loading = false,
    title = "",
    content = ""
  } = options;

  const instance = new DialogConstructor({
    propsData: {
      showCancelButton: showCancelButton,
      loading: loading
    },
    data() {
      return {};
    }
  });
  instance.id = `dialog_${seed}`;
  instance.$slots.title = title;
  instance.$slots.default = content;

  mounted(instance);
  instance.visible = true;
  bindEvent(instance, onOk, onCancel);
  instance.remove = function() {
    unmounted(instance);
  };
  return instance;
};
Dialog.alert = options => {
  options.showCancelButton = false;
  return dialog(options);
};
Dialog.confirm = options => {
  options.showCancelButton = true;
  return dialog(options);
};

const remove = instance => {
  const index = instances.findIndex(item => {
    return item.id === instance.id;
  });
  instances.splice(index, 1);
};
const mounted = instance => {
  instance.vm = instance.$mount();
  document.body.appendChild(instance.$el);
  instances.push(instance);
};
const unmounted = instance => {
  instance.$destroy();
  remove(instance);
  document.body.removeChild(instance.$el);
};
const bindEvent = (instance, onOk, onCancel) => {
  instance.$on("close", () => {
    instance.visible = false;
  });
  instance.$on("closed", () => {
    unmounted(instance);
  });
  instance.$on("on-ok", () => {
    onOk();
    if (instance.loading) {
      instance.buttonLoading = true;
    }
  });
  instance.$on("on-cancel", () => {
    onCancel();
  });
};
export default Dialog;
