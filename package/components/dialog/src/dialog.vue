<template>
  <div class="x-dialog" v-show="dialogShow">
    <div class="x-dialog-mask" v-show="mask" @click="maskClose()"></div>
    <div class="x-dialog-layer">
      <div class="x-dialog-layer_title" v-text="title"></div>
      <div class="x-dialog-layer_content">
        <slot></slot>
      </div>
      <div class="x-dialog-layer_footer">
        <xgroupButton>
          <xbutton class="x-button-inline x-dialog-layer-cancel"  @click="cancelBtn()">{{cancel}}</xbutton>
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
    dialogShow: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '标题'
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
    isMaskClose: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {

    }
  },
  components: {
    xbutton,
    xgroupbutton
  },
  computed: {
  },
  methods: {
    close () {
      this.$emit('close', this.dialogShow)
    },
    cancelBtn () {
      this.$emit('cancel', event)
    },
    confirmBtn () {
      this.$emit('confrim', event)
    },
    maskClose () {
      if (this.isMaskClose) {
        this.close()
      } else {
        return false
      }
    }
  },
  mounted () {
  }
}
</script>
<style lang="stylus">
  @import  '../../../styles/component/dialog.styl'
</style>
