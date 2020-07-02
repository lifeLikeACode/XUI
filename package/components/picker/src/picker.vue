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
    <div class="picker-scroll-wrapper">
      <scroll
        :acceleration="0.008"
        :overflowHidden="false"
        :noBounce="300"
        :pickResetBounce="150"
        :pickerHeight="44"
        class="picker-scroll-container"
      >
        <div v-for="item in columns" :key="item">{{ item }}</div>
      </scroll>
      <div class="picker-mask"></div>
      <div class="picker-select-row"></div>
    </div>
  </div>
</template>

<script>
import scroll from "../../scroll/src/scroll";

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
    "cancel-text": {
      type: String,
      default: "取消"
    },
    "confirm-text": {
      type: String,
      default: "确认"
    },
    columns: {
      type: Array,
      default: () => {
        return [];
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.picker
  user-select none
  width 100%
  // height 260px
  background #ffffff
  // border 1px solid #000
  &-header{
    display flex
    align-items center
    justify-content space-between
    height 44px
    //border-bottom 1px solid #ccc
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
  &-scroll-wrapper
    position relative
    box-sizing border-box
    // border 1px solid #000
    overflow hidden
    height 220px
    // min-height  120px
    width: 100%
    // transform translateY(0%)
  &-scroll-container
    box-sizing border-box
    position absolute
    top 50%
    width 100%
    height 44px
    // width: 100%
    transform translateY(-50%)
  &-mask
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    pointer-events none
    background-repeat no-repeat
    background-position top,bottom
    background-image linear-gradient(180deg, hsla(0, 0%, 100%, 0.9), hsla(0, 0%, 100%, 0.4)), linear-gradient(0deg, hsla(0, 0%, 100%, 0.9), hsla(0, 0%, 100%, 0.4))
    background-size 100% 88px
  &-select-row
    pointer-events none
    position absolute
    top 50%
    width 100%
    height 44px
    transform translateY(-50%)
    &:after
      position absolute
      content " "
      transform translateY(-50%)
      border-top 1px solid #ebedf0
      border-bottom 1px solid #ebedf0
      transform scale(0.5)
      top -50%
      left -50%
      right -50%
      bottom -50%
    // z-index -1
</style>
