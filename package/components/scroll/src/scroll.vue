<template>
  <div class="scroll" ref="scrollWrapper" :style="{ overflow: 'hidden' }">
    <div
      class="scroll-container"
      ref="scrollContainer"
      :style="style"
      @touchstart.prevent="touchstart"
      @touchend.prevent="touchend"
      @touchmove.prevent="touchmove"
      @touchcancel.prevent="touchend"
      @transitionend="onTransitionEnd"
    >
      <div v-for="(item, index) in list" :key="index">{{ index }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "xscroll",
  props: {
    value: {
      type: Array,
      default: () => {
        return [];
      }
    },
    direction: {
      type: String,
      default: ""
    },
    overflowHidden: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      list: this.value,
      scrollWrapper: null,
      duration: 0,
      offset: 0,
      baseDistance: 0, //记录上一次松手后的移动总距离
      startOffset: 0,

      startTime: 0,
      endTime: 0,
      normalScroll: 0,
      bezier: "cubic-bezier(0,-0.02, 0.33, 1)",
      momentumTimeThreshold: 300, // 惯性滑动的启动 时间阈值
      momentumYThreshold: 15, // 惯性滑动的启动 距离阈值
      isStarted: false // start锁
    };
  },
  computed: {
    min() {
      return 0;
    },
    max() {
      return (
        this.$refs.scrollWrapper.getBoundingClientRect().height -
        parseFloat(window.getComputedStyle(this.$refs.scrollContainer).height)
      );
    },
    style() {
      return {
        transform: `translate3d(0,${this.offset}px,0)`,
        "transition-duration": `${this.duration}ms`,
        "transition-timing-function": this.bezier,
        "transition-property": "transform",
        "transition-delay": "0ms"
      };
    }
  },
  watch: {
    value: {
      handler(val) {
        this.list = val;
        this.$emit("input", val);
      },
      deep: true
    }
  },
  methods: {
    touchstart(e) {
      this.isStarted = true;
      this.duration = 0;
      this.stop();
      const touch = e.touches[0];
      const clientY = touch.clientY;
      this.startOffset = clientY;
      this.startTime = new Date().getTime();
      this.baseDistance = this.normalScroll = this.offset;
    },
    touchmove(e) {
      if (!this.isStarted) return;
      const touch = e.touches[0];
      const clientY = touch.clientY;
      let offset = Math.round(clientY - this.startOffset + this.baseDistance);
      //超出边界后滑动增加阻力
      if (offset > this.min) {
        offset = Math.round(
          (clientY - this.startOffset) / 3 + this.baseDistance
        );
      } else if (offset < this.max) {
        offset = Math.round(
          (clientY - this.startOffset) / 3 + this.baseDistance
        );
      }
      this.offset = offset;
      const now = new Date().getTime();
      if (now - this.startTime > this.momentumTimeThreshold) {
        this.normalScroll = this.offset;
        this.startTime = now;
      }
    },
    touchend(e) {
      if (!this.isStarted) return;
      this.isStarted = false;
      this.endTime = new Date().getTime();
      if (this.reset()) return;
      const distance = Math.abs(this.offset - this.normalScroll);
      const duration = this.endTime - this.startTime;
      //触发滑动的条件  1.距离大于 momentumYThreshold  2.时间小于momentumTimeThreshold

      if (
        distance > this.momentumYThreshold &&
        duration < this.momentumTimeThreshold
      ) {
        this.momentum();
      }
      this.normalScroll = this.offset;
      this.baseDistance = this.offset;
    },
    onTransitionEnd() {
      console.log("onTransitionEnd");

      //异步动画修复ios动画异常问题
      setTimeout(() => {
        this.reset();
      }, 16);
    },
    momentum() {
      // 回弹阻力
      const bounceRate = 10;
      //弹性碰壁最长距离
      const maxOverflowY =
        this.$refs.scrollWrapper.getBoundingClientRect().height / 6;

      const distance = this.offset - this.normalScroll;

      this.duration = 2500;

      const speed =
        Math.abs(this.offset - this.normalScroll) /
        (this.endTime - this.startTime);

      let destination = this.offset + (speed / 0.003) * (distance > 0 ? 1 : -1);

      if (destination > this.min) {
        if (destination - this.min > maxOverflowY) {
          this.duration = 400;
          destination = this.min + maxOverflowY;
        } else {
          this.duration = 800;
        }
      } else if (destination < this.max) {
        if (destination < this.max - maxOverflowY) {
          this.duration = 400;
          destination = this.max - maxOverflowY;
        } else {
          this.duration = 800;
        }
      }
      this.offset = Math.round(destination);
      this.baseDistance = this.offset;
    },
    reset() {
      let offset;

      if (this.offset > this.min) {
        // console.log("超出范围", this.min);

        offset = this.min;
      } else if (this.offset < this.max) {
        // console.log("超出范围", this.max);

        offset = this.max;
      }
      if (typeof offset !== "undefined") {
        this.offset = offset;
        this.duration = 500;
        this.bezier = "cubic-bezier(.165, .84, .44, 1)";

        return true;
      }
      return false;
    },
    stop() {
      // 获取当前 translate 的位置
      const matrix = window
        .getComputedStyle(this.$refs.scrollContainer)
        .getPropertyValue("transform");
      this.offset = Math.round(+matrix.split(")")[0].split(", ")[5]);
    }
  },
  mounted() {}
};
</script>

<style lang="stylus" scoped>
.scroll {

  &-container {
    div {

      text-align center
      line-height 40px
      height 40px
      background green
    }
  }
}
</style>
