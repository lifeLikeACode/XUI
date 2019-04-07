<template>
  <div class="x-scroll" ref="visibleArea" :style="scrollStyle">
    <div class="x-scroll-wrapper" ref="scrollWrapper"  :style="wrapperStyle">
      <div class="x-scroll-tab" ref="scrollTab" v-for="(item, index) in data" :class="[ active === index ? 'x-scroll-tab-active': '' ]" :key="index" >data{{item}}</div>
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
    scrollWidth: {
      type: String,
      default: '100%'
    },
    scrollHeight: {
      type: String,
      default: '100%'
    },
    data: {
      type: Array,
      default () {
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
      }
    },
    // 近似等于超出边界时最大可拖动距离(px);
    additionalX: {
      type: Number,
      default: 200
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
      active: 0,
      translateX: 0,
      moveX: 0,
      moveY: 0,
      startX: 0,
      startY: 0,
      acceleration: 0,
      zeroSpeed: 0.001,
      frameTime: 16.7, // 每个动画帧的ms数
      speed: 0
    }
  },
  computed: {
    start: {
      get () {
        return this.vertical ? this.startY : this.startX
      },
      set (val) {
        this[this.vertical ? 'startY' : 'startX'] = val
      }
    },
    scrollStyle () {
      return {
        width: this.scrollWidth,
        height: this.scrollHeight
      }
    },
    visibleArea () {
      return this.$refs.visibleArea[[ this.vertical ? 'offsetHeight' : 'offsetWidth' ]]
    },
    scrollWrapperArea () {
      return this.$refs.scrollWrapper[[ this.vertical ? 'offsetHeight' : 'offsetWidth' ]]
    },
    // 标签页的数量
    count () {
      return this.tab.length
    },
    move: {
      get () {
        return this.vertical ? this.moveY : this.moveX
      },
      set (val) {
        this[this.vertical ? 'moveY' : 'moveX'] = val
      }
    },
    // 移动距离
    delta () {
      return this.vertical ? this.deltaY : this.deltaX
    },
    wrapperStyle () {
      return {
        transform: `translate${this.vertical ? 'Y' : 'X'}(${this.translateX}px)`,
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
      return this.$refs.visibleArea.offsetLeft
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
    $_bindEvent () {
      this.$el.addEventListener('touchstart', this.ontouchstart, false)
      this.$el.addEventListener('touchmove', this.ontouchmove, false)
      this.$el.addEventListener('touchend', this.ontouchend, false)
    },
    ontouchstart (e) {
      this.touching = true
      this.touchstart(e)
    },
    ontouchmove (e) {
      if (!this.touching) {
        return false
      }

      this.startMoveTime = this.endMoveTime ? this.endMoveTime : e.timeStamp
      e.preventDefault()
      e.stopPropagation()
      this.touchmove(e)
      this.last = this.start
      this.moveFellowTouch()

      this.endMoveTime = e.timeStamp
    },
    ontouchend (e) {
      this.touching = false
      if (this.checkReboundX()) {
        cancelAnimationFrame(this.inertiaFrame)
      } else {
        let silenceTime = e.timeStamp - this.endMoveTime
        let timeStamp = this.endMoveTime - this.startMoveTime
        if (silenceTime > 100) return // 停顿时间超过100ms不产生惯性滑动;
        this.speed = (this.move - this.last) / timeStamp
        this.acceleration = this.speed / this.sensitivity
        this.frameStartTime = new Date().getTime()
        this.inertiaFrame = requestAnimationFrame(this.moveByInertia)
      }
    },
    moveFellowTouch () {
      if (this.isLeftMove) { // 向左拖动
        if (this.translateX <= this.rightWrapper) {
          this.translateX += this.additionalX * (this.move - this.start) / (Math.abs(this.translateX - this.rightWrapper) + this.visibleArea)
        } else {
          this.translateX += this.move - this.start
        }
      } else if (this.isRightMove) { // 向右拖动
        if (this.translateX >= this.leftWrapper) {
          this.translateX += this.additionalX * (this.move - this.start) / (Math.abs(this.translateX) + this.visibleArea)
        } else {
          this.translateX += this.move - this.start
        }
      }
      this.start = this.move
    },
    checkReboundX () {
      this.reBounding = false
      if (this.translateX > this.leftWrapper) {
        this.reBounding = true
        this.translateX = this.leftWrapper
      } else if (this.translateX < this.rightWrapper) {
        this.reBounding = true
        this.translateX = this.rightWrapper
      }
      return this.translateX === 0 || this.translateX === -this.listWidth
    },
    moveByInertia () {
      if (this.isLeftMove) {
        if (this.translateX < this.rightWrapper) {
          // 加速度指数变化;

          this.acceleration *= (this.reBoundExponent + Math.abs(this.translateX - this.rightWrapper)) / this.reBoundExponent
          this.speed = Math.min(this.speed - this.acceleration, 0) // 为避免减速过程过短，此处加速度没有乘上frameTime;
        } else {
          this.speed = Math.min(this.speed - this.acceleration * this.frameTime, 0)
        }
      } else if (this.isRightMove) {
        if (this.translateX > this.leftWrapper) {
          this.acceleration *= (this.reBoundExponent + this.translateX) / this.reBoundExponent
          this.speed = Math.max(this.speed - this.acceleration, 0)
        } else {
          this.speed = Math.max(this.speed - this.acceleration * this.frameTime, 0)
        }
      }
      this.translateX += this.speed * this.frameTime / 2
      if (Math.abs(this.speed) <= this.zeroSpeed) {
        this.checkReboundX()
        return
      }
      this.frameStartTime = this.frameEndTime

      this.inertiaFrame = requestAnimationFrame(this.moveByInertia)
    }
  },
  mounted () {
    this.$_bindEvent()
  }
}
</script>
<style lang="stylus">
  .x-scroll
    box-sizing border-box
    display flex
    position relative
    overflow hidden
    border 1px solid #ccc
    .x-scroll-wrapper
      box-sizing border-box
      position relative
      display flex
      padding 5px 10px 0px
      .x-scroll-tab
        padding 0 5px
        text-align center
        box-sizing border-box
        vertical-align middle
        &:not(:first-child){
          margin-left 15px
        }
      .x-scroll-tab-active
        border-bottom 2px solid #00aeff
        color #00aeff
</style>
