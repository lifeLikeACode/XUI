<template>
	<transition name="fade">
		<div class="x-dialog"
		     v-show="visible">
			<div class="x-dialog-mask"
			     v-show="mask"
			     @click="maskClose"></div>
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
    }
  },
  data() {
    return {
      visible: false
    };
  },
  methods: {
    close() {
      this.visible = false;
    },
    // open() {
    //   this.visible = true;
    // },
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
