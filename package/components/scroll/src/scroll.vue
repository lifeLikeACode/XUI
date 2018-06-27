<template>
  <div class="x-scroll">
    <div class="x-scroll-wrapper" >
      <div class="x-scroll-tab" v-for="(item, index) in tab" :key="index">{{item}}</div>
    </div>
  </div>
</template>
<script>
import Touch from '../../../mixin/touch.js'
export default{
  name: 'xscroll',
  mixins: [Touch],
  props: {
    // 默认水平显示横向滚动条
    vertical: {
      type: Boolean,
      default: false
    },
    visibleAreaTab: {
      type: Number,
      default: 4
    },
    tab: {
      type: Array,
      default: [1, 2, 3, 4, 5, 6, 7, 8]
    }
  },
  data () {
    return {
      wrapperWidth: 0,
      wrapperHeight: 0,
      tabWidth: 0,
      tabHeight: 0
    }
  },
  computed: {
    direction () {
      return this.vertical ? 'vertical' : 'horizontal'
    },
    wrapperSize () {
      const size = (this.vertical ? this.wrapperHeight : this.wrapperWidth) * this.tab

      return size
    },
    tabSize () {
      return {}
    }
  },
  methods: {
    $_initScroll () {

    }
  }
}
</script>
<style lang="stylus">
  .x-scroll
    width 100%
    height 40px
    overflow hidden
    .x-scroll-wrapper
      .x-scroll-tab
        float left
</style>
