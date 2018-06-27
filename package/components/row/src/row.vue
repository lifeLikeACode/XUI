<template>
  <div :is="tag"  :class="[ { [`x-row-${type}`] : `${type}` }  , { [`x-row-justify-${justify}`] : `${justify}` }  ,{ [`x-row-align-${align}`] : `${align}` }  ,'x-row' ]" :style="styles">
    <slot/>
  </div>
</template>
<script>
// import xcol from '../../col/index'
export default {
  name: 'xrow',
  props: {
    type: {
      type: String,
      default: ''
    },
    tag: {
      type: String,
      default: 'div'
    },
    justify: {
      type: String,
      default: ''
    },
    align: {
      type: String,
      default: ''
    },
    gutter: {
      type: Number,
      default: 0
    }
  },
  computed: {
    styles () {
      const margin = `-${Number(this.gutter) / 2}px`
      return this.gutter ? { marginLeft: margin, marginRight: margin } : {}
    }
  }
}
</script>
<style lang="stylus">
  .x-row
    box-sizing border-box
    &::after
      content ""
      display table
      clear both
  .x-row-flex
    display flex
  .x-row-justify-center
    justify-content center
  .x-row-justify-end
    justify-content end
  .x-row-justify-space-between
    justify-content space-between
  .x-row-justify-space-around
    justify-content space-around
  .x-row-align-center
    align-items center
  .x-row-align-bottom
    aligin-items bottom
</style>
