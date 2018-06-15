<template>
  <div class="x-swiper-item" :style="style">
    <slot/>
  </div>
</template>
<script>
export default {
  name: 'xswiperItem',
  props: {

  },
  data () {
    return {
      offset: 0
    }
  },
  computed: {
    style () {
      const { width, height, vertical } = this.$parent
      return {
        width: width + 'px',
        height: height + 'px',
        transform: `translate${vertical ? 'Y' : 'X'}(${this.offset}px)`
      }
    }
  },
  beforeCreate () {
    this.$parent.swipes.push(this)
  },
  destroyed () {
    this.$parent.swipes.splice(this.$parent.swipes.indexOf(this), 1)
  }
}
</script>
<style lang="stylus">
  .x-swiper-item
    height 100%
</style>
