<template>
  <div class="scroll" ref="scrollWrapper">
    <div
      class="scroll-container"
      ref="scrollContainer"
      :style="style"
      @touchstart.prevent="touchstart"
      @touchend.prevent="touchend"
      @touchmove.prevent="touchmove"
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
    }
  },
  data() {
    return {
      list: this.value,
      scrollWrapper: null,
      duration: 0,
      offset: 0,
      baseDistance: 0,
      startOffset: 0,

      preTime: 0,
      nextTime: 0,

      bezier: "cubic-bezier(0,-0.02, 0.33, 1)",
      momentumTimeThreshold: 300, // 惯性滑动的启动 时间阈值
      momentumYThreshold: 15 // 惯性滑动的启动 距离阈值
    };
  },
  computed: {
    min() {
      return this.scrollWrapper.getBoundingClientRect().top;
    },
    max() {
      return (
        this.scrollWrapper.getBoundingClientRect().height -
        this.$refs.scrollContainer.getBoundingClientRect().height
      );
    },
    style() {
      return {
        transform: `translate3d(0,${this.offset}px,0)`,
        "transition-duration": `${this.duration}ms`,
        "transition-timing-function": this.bezier
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
      const touch = e.touches[0];
      const pageY = touch.pageY;
      this.duration = 0;
      this.startOffset = pageY;
      this.preTime = e.timeStamp;
      console.log("start", this.startOffset);
    },
    touchmove(e) {
      const touch = e.touches[0];
      const pageY = touch.pageY;
      const clientY = touch.clientY;
      console.log(pageY, clientY);
      const offset = Math.round(pageY - this.startOffset + this.baseDistance);
      if (offset > this.min) {
        this.offset = Math.round(
          (pageY - this.startOffset) / 3 + this.baseDistance
        );
      } else if (offset < this.max) {
        this.offset = Math.round(
          (pageY - this.startOffset) / 3 + this.baseDistance
        );
      } else {
        this.offset = offset;
      }
      this.nextTime = e.timeStamp;
      if (this.nextTime - this.preTime > momentumTimeThreshold) {
      }
    },
    touchend(e) {
      let offset = 0;
      let duration = 0;
      if (this.offset > this.min) {
        // console.log("超出范围", this.min);
        duration = 400;
        offset = this.min;
      } else if (this.offset < this.max) {
        // console.log("超出范围", this.max);
        duration = 400;
        offset = this.max;
      } else {
        offset = this.offset;
        duration = 2500;
      }
      this.duration = duration;
      this.offset = offset;
      //  else {
      //   console.log("未超出范围");
      //   offset = offset;
      // }
      this.baseDistance = this.offset;
    }
  },
  mounted() {
    this.scrollWrapper = this.$refs.scrollWrapper;
    console.log(getComputedStyle(this.$refs.scrollContainer));
    console.log(this.$refs.scrollWrapper.getBoundingClientRect());
  }
};
</script>

<style lang="stylus" scoped>
.scroll {
  width 100%
  height 100vh
  overflow hidden
  &-container {
    div {

      text-align center
      line-height 40px
      height 40px
    }
  }
}
</style>
