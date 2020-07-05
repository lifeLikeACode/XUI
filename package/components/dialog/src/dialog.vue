<template>
  <transition
    name="fade"
    @afterLeave="afterLeave"
  >
    <div
      class="x-dialog"
      v-if="visible"
    >
      <div
        class="x-dialog-mask"
        v-show="mask"
        @click="maskClose"
      ></div>
      <div class="x-dialog-layer">
        <div class="x-dialog-layer_title">
          <slot name="title">{{ title }}</slot>
        </div>
        <div class="x-dialog-layer_content">
          <slot>{{ content }}</slot>
        </div>
        <div class="x-dialog-layer_footer">
          <slot name="footer">
            <xgroupButton>
              <xbutton
                @click="cancel"
                v-if="showCancelButton"
              >{{
                cancelText
              }}</xbutton>
              <xbutton
                :loading="buttonLoading"
                @click="confirm"
                v-if="showConfirmButton"
                :iconColor="confirmIconLoadingColor"
              >{{
                buttonLoading ? "" : confirmText
              }}</xbutton>
            </xgroupButton>
          </slot>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import Button from "../../button/index";
import GroupButton from "../../groupButton/index";

export default {
  name: "xdialog",
  components: {
    [GroupButton.name]: GroupButton,
    [Button.name]: Button
  },
  props: {
    title: {
      type: String,
      default: "标题"
    },
    content: {
      type: String,
      default: ""
    },
    showCancelButton: {
      type: Boolean,
      default: true
    },
    showConfirmButton: {
      type: Boolean,
      default: true
    },
    "confirm-text": {
      type: String,
      default: "确定"
    },
    "cancel-text": {
      type: String,
      default: "取消"
    },
    mask: {
      type: Boolean,
      default: true
    },
    isMaskClose: {
      type: Boolean,
      default: true
    },
    value: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: this.value,
      buttonLoading: false,
      confirmIconLoadingColor: "#00aeff"
    };
  },
  computed: {},
  watch: {
    value(val) {
      this.visible = val;
      this.$emit("input", val);
    }
  },
  methods: {
    close() {
      this.visible = false;
      this.$emit("input", this.visible);
    },
    show() {
      this.visible = true;
      this.$emit("input", this.visible);
    },
    maskClose() {
      if (this.isMaskClose) {
        this.close();
        // this.$emit("on-cancel");
      }
    },
    afterLeave() {
      this.$emit("closed");
    },
    confirm() {
      if (this.loading) {
        this.buttonLoading = true;
      } else {
        this.close();
      }
      this.$emit("on-ok");
    },
    cancel() {
      this.close();
      this.$emit("on-cancel");
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '../../../styles/component/dialog.styl';
</style>
