<template>
  <component :is="tag" class="x-button" :class="btnClass" :disabled="disabled" @click="$_onBtnClick">
    <i v-if="icon" :class="['icon-'+icon]"></i>
    <slot></slot>
  </component>
</template>
<script>
export default {
  name: 'xbutton',
  props: {
    tag: {
      type: String,
      default: 'button'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    inline: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ''
    },
    primary: {
      type: Boolean,
      default: false
    },
    danger: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    btnClass () {
      return {
        'x-button-inline': this.inline,
        'x-button-primary': this.primary,
        'x-button-danger': this.danger
      }
    }
  },
  methods: {
    $_onBtnClick (event) {
      if (this.disabled) {
        event.stopImmediatePropagation()
      } else {
        this.$emit('click', event)
      }
    }
  }
}
</script>
<style lang="stylus">
  @import '../../../styles/component/button.styl'
</style>
