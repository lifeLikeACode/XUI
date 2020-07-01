<template>
  <div class="picker">
    <div class="picker-header">
      <button class="picker-header-button picker-header-button__cancel">
        {{ cancel }}
      </button>
      <div>
        <slot name="title">{{ title }}</slot>
      </div>
      <button class="picker-header-button picker-header-button__confirm">
        {{ confirm }}
      </button>
    </div>
    <scroll :overflowHidden="true" class="scroll-container"> </scroll>
  </div>
</template>

<script>
import scroll from "../../scroll/src/scroll";
const itemHeight = 40;
export default {
  name: "xpicker",
  components: {
    scroll
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    cancel: {
      type: String,
      default: "取消"
    },
    confirm: {
      type: String,
      default: "确认"
    }
  }
};
</script>

<style lang="stylus" scoped>
.picker
  user-select none
  width 100%
  height 260px
  &-header{
    display flex
    align-items center
    justify-content space-between
    height 44px
    &-button{
      outline none
      height 100%
      padding 0 16px
      font-size 14px
      background-color transparent
      border none
      cursor pointer

    }
    &__cancel{

      }
      &__confirm {

      }
  }
  .scroll-container
    border 1px solid #000
    margin: 0 auto
    height: 40px
    width: 80%
    transform translateY(0%)
</style>
