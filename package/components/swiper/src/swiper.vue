<template>
  <div class="x-swiper" >
    <div :style="trackStyle" class="x-swiper_track"
        @touchstart="onTouchStart($event)"
        @touchmove="onTouchMove($event)"
        @touchend="onTouchEnd($event)"
        @transitionend="$emit('change', activeIndicator)"
    >
      <slot></slot>
    </div>
    <div class="x-swiper-dot">
      <i></i>
    </div>
  </div>
</template>
<script>
import Touch from '../../../mixin/touch.js'
export default {
  name: 'xswiper',
  mixins: [Touch],
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 3000
    },
    swiperList: {
      type: Array
    },
    duration: {
      type: Number,
      default: 300
    },
    vertical: {
      type: Boolean,
      default: false
    },
    initialSwipe: {
      type: Number,
      default: 0
    },
    autoplay: Number,
    touchable: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      width: 0,
      height: 0,
      deltaX: 0, // 移动的距离
      deltaY: 0,
      offset: 0,
      active: 0,
      swipes: [],
      direction: 'horizontal',
      swiping: false
    }
  },
  computed: {
    count () {
      return this.swipes.length
    },
    delta () {
      return this.vertical ? this.deltaY : this.deltaX
    },
    size () {
      return this[this.vertical ? 'height' : 'width']
    },
    trackSize () {
      return this.count * this.size
    },
    activeIndicator () {
      return (this.active + this.count) % this.count
    },
    trackStyle () {
      return {
        [this.vertical ? 'height' : 'width']: `${this.trackSize}px`,
        transitionDuration: `${this.swiping ? 0 : this.duration}ms`,
        transform: `translate${this.vertical ? 'Y' : 'X'}(${this.offset}px)`
      }
    }
  },
  watch: {
    swipes () {
      this.$_initSwiper()
    },

    initialSwipe () {
      this.$_initSwiper()
    },
    loop () {
      this.autoPlay()
    }
  },
  methods: {
    $_initSwiper () {
      let rect = this.$el.getBoundingClientRect()
      this.width = rect.width
      this.height = rect.height
      this.swiping = true
      this.active = this.initialSwipe
      this.offset = this.count > 1 ? -this.size * this.active : 0
      this.swipes.forEach(swipe => {
        swipe.offset = 0
      })
      this.autoPlay()
    },
    $_initDot () {

    },
    onTouchStart (event) {
      if (!this.touchable) {
        return
      }
      this.clear()
      this.touchstart(event)

      this.correctPosition()
    },
    onTouchMove (event) {
      if (!this.touchable) {
        return
      }
      this.touchmove(event)
      if ((this.vertical && this.direction === 'vertical') || this.direction === 'horizontal') {
        event.preventDefault()
        event.stopPropagation()
      }
      this.move(0, Math.min(Math.max(this.delta, -this.size), this.size))
    },
    onTouchEnd (event) {
      if (!this.touchable) {
        return
      }
      if (this.delta) {
        const offset = this.vertical ? this.offsetY : this.offsetX
        this.move(offset > 50 ? (this.delta > 0 ? -1 : 1) : 0)
        this.swiping = false
      }
      this.autoPlay()
    },
    move (move = 0, offset = 0) {
      const { delta, active, count, swipes, trackSize } = this
      const atFirst = active === 0
      const atLast = active === count - 1
      const outOfBounds = !this.loop && ((atFirst && (offset > 0 || move < 0)) || (atLast && (offset < 0 || move > 0)))

      if (outOfBounds || count <= 1) {
        return
      }
      if (move) {
        if (active === -1) {
          swipes[count - 1].offset = 0
        }
        swipes[0].offset = atLast && move > 0 ? trackSize : 0

        this.active += move
      } else {
        if (atFirst) {
          swipes[count - 1].offset = delta > 0 ? -trackSize : 0
        } else if (atLast) {
          swipes[0].offset = delta < 0 ? trackSize : 0
        }
      }
      this.offset = offset - this.active * this.size
    },
    correctPosition () { // 纠正位置
      if (this.active <= -1) {
        this.move(this.count)
      }
      if (this.active >= this.count) {
        this.move(-this.count)
      }
    },
    clear () {
      clearTimeout(this.timer)
    },
    autoPlay () {
      const { interval, loop, count } = this
      if (loop || count > 1) {
        this.clear()
        this.timer = setInterval(() => {
          this.swiping = true
          this.correctPosition()
          setTimeout(() => {
            this.swiping = false
            this.move(1)
            this.autoPlay()
          }, 30)
        }, interval)
      }
    },
    $_resize () {
      window.addEventListener('resize', () => {
        this.$_initSwiper()
      })
    }
  },
  created () {

  },
  mounted () {
    this.$_initSwiper()
    this.$_resize()
  }
}
</script>
<style lang="stylus">
  @import  '../../../styles/component/swiper.styl'
</style>
