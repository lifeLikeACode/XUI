<template>
  <div class="x-scroll" ref="visibleArea" >
    <div class="x-scroll-wrapper" ref="scrollWrapper"  :style="wrapperStyle">
      <div class="x-scroll-tab" ref="scrollTab" v-for="(item, index) in tab" :class="[ active === index ? 'x-scroll-tab-active': '' ]" :key="index" >tab{{item}}</div>
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
    // visibleAreaTab: {
    //   type: Number,
    //   default: 4
    // },
    tab: {
      type: Array,
      default () {
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 130, 14, 15, 160]
      }
    },
    // 近似等于超出边界时最大可拖动距离(px);
    additionalX: {
      type: Number,
      default: 50
    },
    // 惯性回弹指数(值越大，幅度越大，惯性回弹距离越长);
    reBoundExponent: {
      type: Number,
      default: 10
    },
    // 灵敏度(惯性滑动时的灵敏度,值越小，阻力越大),可近似认为速度减为零所需的时间(ms);
    sensitivity: {
      type: Number,
      default: 1000
    },
    // 回弹过程duration;
    reBoundingDuration: {
      type: Number,
      default: 360
    }
  },
  data () {
    return {
      touching: false,
      reBounding: false,
      deltaX: 0,
      deltaY: 0,
      offsetX: 0,
      offsetY: 0,
      offset: 0,
      active: 0,
      prevMove: 0
    }
  },
  computed: {
    visibleArea () {
      return getComputedStyle(this.$refs.visibleArea)[ this.vertical ? 'height' : 'width' ].replace('px', '')
    },
    scrollWrapperArea () {
      return getComputedStyle(this.$refs.scrollWrapper)[ this.vertical ? 'height' : 'width' ].replace('px', '')
    },
    // 标签页的数量
    count () {
      return this.tab.length
    },
    // 移动距离
    delta () {
      return this.vertical ? this.deltaY : this.deltaX
    },
    // tabWidth () {
    //   let tabWidth
    //   this.$nextTick(() => {
    //     tabWidth = this.visibleArea / this.visibleAreaTab
    //   })
    //   return tabWidth
    // },
    // tabSize () {
    //   const arr = []
    //   this.$nextTick(() => {
    //     this.$refs.scrollTab.forEach(item => {
    //       console.log(item)
    //       const itemStyle = getComputedStyle(item)[ this.vertical ? 'height' : 'width' ].replace('px', '')

    //       arr.push(itemStyle)
    //     })
    //   })
    //   return arr
    // },
    // tabStyle () {

    //   return {
    //     [ this.vertical ? 'marginTop' : 'marginLeft' ]: (this.tabWidth - itemStyle) / 2 + 'px',
    //     [ this.vertical ? 'marginBottom' : 'marginRight' ]: (tabWidth - itemStyle) / 2 + 'px'
    //   }
    // },
    wrapperStyle () {
      return {
        transform: `translate${this.vertical ? 'Y' : 'X'}(${this.offset}px)`,
        transitionDuration: `${this.transitionDuration}ms`,
        transitionTimingFunction: this.transitionTimingFunction
      }
    },
    transitionTimingFunction () {
      return this.reBounding ? 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'cubic-bezier(0.1, 0.57, 0.1, 1)'
    },
    transitionDuration () {
      
      
      if (this.touching || (!this.reBounding && !this.touching)) {
        return '0'
      }
      if (this.reBounding && !this.touching) {
        return this.reBoundingDuration
      }
    },
    isLeftMove () {
      return this.delta < 0
    },
    isRightMove () {
      return this.delta > 0
    },
    leftWrapper () {
      return 0
    },
    rightWrapper () {
      return this.visibleArea - this.scrollWrapperArea
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
    $_bindEvent () {
      this.$el.addEventListener('touchstart', this.ontouchstart, false)
      this.$el.addEventListener('touchmove', this.ontouchmove, false)
      this.$el.addEventListener('touchend', this.ontouchend, false)
    },
    ontouchstart (e) {
      this.touching = true
      this.touchstart(e)
      this.prevMove = this.offset
    },
    ontouchmove (e) {
      if (!this.touching) {
        return false
      }
      this.startMoveTime = this.endMoveTime ? this.endMoveTime : e.timeStamp
      e.preventDefault()
      e.stopPropagation()
      this.touchmove(e)
      this.move()
      this.endMoveTime = e.timeStamp
    },
    ontouchend (e) {
      let silenceTime = e.timeStamp - this.endMoveTime
      let timeStamp = this.endMoveTime - this.startMoveTime
      if (silenceTime > 100) return // 停顿时间超过100ms不产生惯性滑动;
      this.speed = this.delta / timeStamp
      console.log(this.speed)
      this.touching = false
    },
    move () {
      this.offset = this.delta + this.prevMove
      if (this.isLeftMove) { // 向左拖动
        if (this.offset < this.rightWrapper) {
          // do something
          this.offset = this.rightWrapper
        }else{
          this.offset = this.prevMove + this.delta
        }
      } else if (this.isRightMove) { // 向右拖动
        if (this.offset > this.leftWrapper) {
          // do something
          this.offset = this.leftWrapper
        }else{
          this.offset = this.prevMove + this.delta
        }
      }
    }
  },
  mounted () {
    this.$_initScroll()
    this.$_bindEvent()
  }
}
</script>
<style lang="stylus">
  .x-scroll
    box-sizing border-box
    display flex
    position relative
    width 100%
    height 36px
    overflow hidden
    border 1px solid #ccc
    .x-scroll-wrapper
      box-sizing border-box
      position relative
      display flex
      padding 5px 10px 0px
      .x-scroll-tab
        padding 0 5px
        // height 36px
        text-align center
        box-sizing border-box
        vertical-align middle
        // line-height 36px
        &:not(:first-child){
          margin-left 15px
        }
      .x-scroll-tab-active
        border-bottom 2px solid #00aeff
        color #00aeff
</style>
