<template>
  <component :is="tag"
             class="x-button"
             :disabled="disabled"
             @click="$_onBtnClick"
             :class="[{ [`icon-${iconPosition}`]:true} ,btnClass]">
    <xicon name="loading"
           class="spin"
           v-if="loading"></xicon>
    <xicon :name="iconName"
           v-if=" iconName && !loading"></xicon>
    <span class="x-button-content">
      <slot></slot>
    </span>
  </component>
</template>
<script>
import xicon from "../../icon/index.js";
export default {
  name: "xbutton",
  components: {
    xicon
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    iconPosition: {
      type: String,
      default: "left"
    },
    iconName: {
      type: String,
      default: ""
    },
    tag: {
      type: String,
      default: "button"
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
      default: ""
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
    btnClass() {
      return {
        "x-button-inline": this.inline,
        "x-button-primary": this.primary,
        "x-button-danger": this.danger,
        "x-button-disabled": this.disabled
      };
    }
  },
  methods: {
    $_onBtnClick(event) {
      if (this.disabled) {
        event.stopImmediatePropagation();
      } else {
        this.$emit("click", event);
      }
    }
  }
};
</script>
<style lang="stylus">
@import '../../../styles/component/button.styl';
</style>
