<template>
  <transition name="fade">
    <div class="x-dialog" v-show="visible">
      <div class="x-dialog-mask" v-show="mask" @click="maskClose"></div>
      <div class="x-dialog-layer">
        <div class="x-dialog-layer_title">
          <slot name="title"></slot>
        </div>
        <div class="x-dialog-layer_content">
          <slot name="content"></slot>
        </div>
        <div class="x-dialog-layer_footer">
          <slot name="content"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "xdialog",
  props: {
    title: {
      type: String,
      default: "标题"
    },
    confirm: {
      type: String,
      default: "确定"
    },
    cancel: {
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
    value:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      visible: this.value
    };
  },
  watch:{
    value(val){
      this.visible = val;
      this.$emit("input",val);
    }
  },
  methods: {
    close() {
      this.visible = false;
      this.$emit("input",this.visible);
    },
    show() {
      this.visible = true;
      this.$emit("input",this.visible);
    },
    maskClose() {
      if (this.isMaskClose) {
        this.close();
      }
    },
    afterLeave() {
      this.$emit("closed");
    }
  }
};
</script>
<style lang="stylus">
@import '../../../styles/component/dialog.styl';
</style>
