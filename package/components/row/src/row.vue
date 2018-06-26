<template>
  <div :is="tag" :type="type"  :class="[ { [`x-row-${type}`] : `${type}` }  , 'x-row' ]" :style="styles">
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
      default: 0,
      validate (val) {
        return Number(val)
      }
    }
  },
  computed: {
    styles () {
      const { justify, align } = this

      return {
        'justfiy-content': `${justify}`,
        'align-item': `${align}`
      }
    }
  }
}
</script>
<style lang="stylus">
  .x-row-flex
    display flex
</style>
