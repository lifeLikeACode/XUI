<template>
  <div class="x-scroll" >
    <div class="x-scroll-wrapper" :style="wrapperStyle" @touchstart="ontouchstart" @touchmove="ontouchmove" @touchend="ontouchend">
      <div class="x-scroll-tab" v-for="(item, index) in tab" :key="index" :style="tabStyle">tab{{item}}</div>
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
      default () {
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
      }
    }
  },
  data () {
    return {
      wrapperWidth: 0, // 总的tab的宽度
      wrapperHeight: 0, // 总的tab的高度
      tabWidth: 0,
      tabHeight: 0,
      deltaX: 0,
      deltaY: 0,
      offset: 0,
      active: 0,
      prevMove: 0
    }
  },
  computed: {
    // 屏幕大小
    screen () {
      return [this.vertical ? window.screen.height : window.screen.width]
    },
    // 标签页的数量
    count () {
      return this.tab.length
    },
    delta () {
      return this.vertical ? this.deltaY : this.deltaX
    },
    tabSize () {
      const size = this.screen / this.visibleAreaTab
      return size
    },
    tabStyle () {
      return {
        [ this.vertical ? 'height' : 'width' ]: `${this.tabSize}px`

      }
    },
    wrapperStyle () {
      return {
        [ this.vertical ? 'height' : 'width' ]: `${this.tabSize * this.count}px`,
        transform: `translate${this.vertical ? 'Y' : 'X'}(${-1 * this.offset}px)`,
        transitionDuration: '300ms'
      }
    },
    leftWrapper () {
      return 0
    },
    rightWrapper () {
      return (this.count - this.visibleAreaTab) * this.tabSize
    }
  },
  watch: {
    tab () {
      this.$_initScroll()
    }
  },
  methods: {
    $_initScroll () {

    },
    ontouchstart (e) {
      this.touchstart(e)
      const offset = this.vertical ? this.offsetY : this.offsetX
      // this.prevMove += offset
      this.offset = this.prevMove
    },
    ontouchmove (e) {
      // if (this.vertical) {
      e.preventDefault()
      e.stopPropagation()
      // }
      this.touchmove(e)
      const offset = this.vertical ? this.offsetY : this.offsetX
      this.move(offset)
    },
    ontouchend (e) {
      this.prevMove = this.offset
      this.offset = this.delta > 0 ? (-1 * this.offset > this.leftWrapper ? 0 : this.offset) : (this.offset > this.rightWrapper ? this.rightWrapper : this.offset)
      this.prevMove = this.delta > 0 ? (-1 * this.prevMove > this.leftWrapper ? 0 : this.prevMove) : (this.prevMove > this.rightWrapper ? this.rightWrapper : this.prevMove)
    },
    move (offset) {
      console.log(offset)

      this.delta > 0 ? (this.offset = -1 * offset - this.prevMove) : (this.offset = offset + this.prevMove)
      this.active = Math.ceil(this.offset / this.tabSize) > 0 ? (Math.ceil(this.offset / this.tabSize) > this.count ? this.count : Math.ceil(this.offset / this.tabSize)) : 0

      // this.offset = this.delta > 0 ? (offset > this.leftWrapper ? 0 : offset) : (offset > -this.rightWrapper ? this.rightWrapper : offset)
      // this.offset > this.leftWrapper ? 0 : this.offset
      // this.offset > -this.rightWrapper ? this.rightWrapper : this.offset
      // console.log(offset)
      // this.offset = offset
    }
  },
  mounted () {
    this.$_initScroll()
  }
}
</script>
<style lang="stylus">
  .x-scroll
    width 100%
    height 60px
    overflow hidden
    .x-scroll-wrapper
      .x-scroll-tab
        height 60px
        float left
        text-align center
        border 1px solid #333
        box-sizing border-box
        vertical-align middle
        line-height 60px
</style>
