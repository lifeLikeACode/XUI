<template>
  <div
    class="scroll"
    ref="scrollWrapper"
    :style="{ overflow: overflowHidden ? 'hidden' : 'visible' }"
  >
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
      <slot>
        <!-- <div
          v-for="(item, index) in list"
          :key="index"
        ><p>{{ index }}</div> -->
      </slot>
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
    weekBounce: {
      type: Number,
      default: 800
    },
    strongBounce: {
      type: Number,
      default: 400
    },
    noBounce: {
      type: Number,
      default: 2500
    },
    pickResetBounce: {
      type: Number,
      default: 100
    },
    direction: {
      type: String,
      default: ""
    },
    overflowHidden: {
      type: Boolean,
      default: true
    },
    isPicker: {
      type: Boolean,
      default: true
    },
    pickerHeight: {
      type: Number,
      default: 44
    },
    acceleration: {
      type: Number,
      default: 0.002
    }
  },
  data() {
    return {
      list: this.value,

      duration: 0,
      offset: 0,
      baseDistance: 0, //记录上一次松手后的移动总距离
      startOffset: 0,
      startTime: 0,
      endTime: 0,
      normalScroll: 0,
      bezier: "",
      momentumTimeThreshold: 300, // 惯性滑动的启动 时间阈值
      momentumYThreshold: 15, // 惯性滑动的启动 距离阈值
      isStarted: false, // start锁
      transitionEndFlag: false
    };
  },
  computed: {
    min() {
      return 0;
    },
    max() {
      return this.wrapperHeight - this.scrollHeight;
    },
    wrapperHeight() {
      return this.$refs.scrollWrapper.getBoundingClientRect().height;
    },
    scrollHeight() {
      return parseFloat(
        window.getComputedStyle(this.$refs.scrollContainer).height,
        10
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
      this.transitionEndFlag = true;
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
      if (!this.isPicker) {
        //超出边界后滑动增加阻力
        if (offset > this.min) {
          //console.log("超出顶部")

          offset = Math.round(
            (clientY - this.startOffset) / 3 + this.baseDistance
          );
        } else if (offset < this.max) {
          //console.log("超出底部")
          offset = Math.round(
            (clientY - this.startOffset) / 3 + this.baseDistance
          );
        }
      } else {
        if (offset > this.min + this.pickerHeight) {
          console.log("超出顶部");

          offset = Math.round(this.min + this.pickerHeight);
        } else if (offset < this.max - this.pickerHeight) {
          console.log("超出底部");
          offset = Math.round(this.max - this.pickerHeight);
        }
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
      } else {
        this.fixPickerOffset();
        // setTimeout(() => {
        //   this.reset();
        // }, 16);
      }
      this.normalScroll = this.offset;
      this.baseDistance = this.offset;
    },
    onTransitionEnd() {
      if (!this.transitionEndFlag) {
        return false;
      }
      console.log("onTransitionEnd");
      this.transitionEndFlag = false;
      //异步动画修复ios动画异常问题
      setTimeout(() => {
        if (this.isPicker) {
          this.fixPickerOffset();
        } else {
          this.reset();
        }
      }, 16);
    },
    momentum() {
      let type = "noBounce";
      const durationMap = {
        weekBounce: this.weekBounce,
        strongBounce: this.strongBounce,
        noBounce: this.noBounce
      };
      const bezierMap = {
        noBounce: "cubic-bezier(.17, .89, .45, 1)",
        weekBounce: "cubic-bezier(.25, .46, .45, .94)",
        strongBounce: "cubic-bezier(.25, .46, .45, .94)"
      };
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

      let destination =
        this.offset + (speed / this.acceleration) * (distance > 0 ? 1 : -1);

      if (destination > this.min) {
        if (destination - this.min > maxOverflowY) {
          type = "strongBounce";
          destination = this.min + maxOverflowY;
        }
      } else if (destination < this.max) {
        if (destination < this.max - maxOverflowY) {
          type = "strongBounce";
          destination = this.max - maxOverflowY;
        }
      }
      this.duration = durationMap[type];
      this.bezier = bezierMap[type];
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
    },
    fixPickerOffset() {
      if (this.isPicker) {
        this.bezier = "cubic-bezier(0.23, 1, 0.68, 1)";
        this.duration = this.pickResetBounce;
        const index = Math.round(this.offset / this.pickerHeight).toFixed(0);
        this.offset = index * this.pickerHeight;
        this.$emit("get-picker-index", Math.abs(index));
      }
    },
    goTo(offset) {
      this.baseDistance = offset;
      this.normalScroll = offset;
      this.offset = offset;
      this.$forceUpdate();
    }
  },
  mounted() {}
};
</script>

<style lang="stylus" scoped></style>
