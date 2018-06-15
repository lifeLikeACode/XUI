<template>
  <div class="x-dialog" v-show="show">
    <div class="x-dialog-mask" v-show="mask"></div>
    <div class="x-dialog-layer">
      <div class="x-dialog-layer_title">{{title}}</div>
      <div class="x-dialog-layer_content">{{content}}</div>
      <div class="x-dialog-layer_footer">
        <xgroupButton>
          <xbutton class="x-button-inline x-dialog-layer-cancel" @click="cancelBtn()">{{cancel}}</xbutton>
          <xbutton class="x-button-inline x-dialog-layer-confirm" @click="confirmBtn()">{{confirm}}</xbutton>
        </xgroupButton>
      </div>
    </div>
  </div>
</template>
<script>
import xbutton from '../../button/index.js'
import xgroupbutton from '../../groupButton/index.js'
export default {
  name: 'xdialog',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '标题'
    },
    content: {
      type: String,
      default: '内容'
    },
    confirm: {
      type: String,
      default: '确定'
    },
    cancel: {
      type: String,
      default: '取消'
    },
    mask: {
      type: Boolean,
      default: true
    },
    maskClose: {
      type: Boolean,
      default: true
    }
  },
  computed: {
  },
  methods: {
    close () {
      this.show = false
    },
    alert () {
      this.show = true
    },
    cancelBtn () {
      this.$emit('cancel', event)
    },
    confirmBtn () {
      this.$emit('confrim', event)
    }
  },
  mounted () {
    console.log(xbutton, xgroupbutton)
  }
}
</script>
<style lang="stylus">
  @import  '../../../styles/component/dialog.styl'
</style>
