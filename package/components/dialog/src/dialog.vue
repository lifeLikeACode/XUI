<template>
  <div class="x-dialog" v-show="insideDialogShow">
    <div class="x-dialog-mask" v-show="mask" @click="$emit('maskClick',event)"></div>
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
      insideDialogShow: this.dialogShow
    }
  },
  watch: {
    dialogShow (val) {
      this.insideDialogShow = val
    },
    insideDialogShow (val) {
      this.dialogShow = val
    }
  },
  computed: {
  },
  methods: {
    close () {
      this.insideDialogShow = false
    },
    alert () {
      this.insideDialogShow = true
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
