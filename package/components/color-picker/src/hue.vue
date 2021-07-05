<template>
  <div @click="handlerClick" :class="[prefix + '-hue-slider']" ref="hueSlider">
    <!-- 渐变色 -->
    <div :class="[prefix + '-hue-gradient']"></div>

    <!-- 滑块 -->
    <div
      @mousedown="handlerMouseDown"
      :style="style"
      :class="[prefix + '-hue-pointer']"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      prefix: "color-picker",
      hueSlider: {
        width: 0,
        left: 0,
        x: 0
      }
    };
  },
  computed: {
    hue: {
      get() {
        return this.value / 360;
      },
      set(val) {
        this.$emit("input", val * 360);
        this.$emit("change-hue", val * 360);
      }
    },
    style() {
      return {
        left: this.hue * 100 + "%"
      };
    }
  },
  methods: {
    handlerClick(e) {
      const offsetLeft =
        (e.clientX - this.hueSlider.left) / this.hueSlider.width;
      this.hue = offsetLeft < 0 ? 0 : offsetLeft > 1 ? 1 : offsetLeft;
    },
    handlerMouseDown(e) {
      document.addEventListener("mousemove", this.handlerMouseMove);
      document.addEventListener("mouseup", this.handlerMouseUp);
    },
    handlerMouseMove(e) {
      e.preventDefault();
      const offsetLeft =
        (e.clientX - this.hueSlider.left) / this.hueSlider.width;
      this.hue = offsetLeft < 0 ? 0 : offsetLeft > 1 ? 1 : offsetLeft;
    },
    handlerMouseUp(e) {
      document.removeEventListener("mousemove", this.handlerMouseMove);
      document.removeEventListener("mouseup", this.handlerMouseUp);
    }
  },
  mounted() {
    const { width, left, x } = this.$refs.hueSlider.getBoundingClientRect();
    this.hueSlider = {
      width,
      left,
      x
    };
  }
};
</script>

<style lang="stylus" scoped>
.color-picker-hue-slider {
  cursor: pointer;
	position:relative;
	width:240px;
	height:10px;
	margin-top: 10px;
}
.color-picker-hue-gradient {
	position: absolute;
	top: 0;
	left:0;
	bottom: 0;
	right: 0;
	background: linear-gradient(to right,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red 100%);
}
.color-picker-hue-pointer {
	position:absolute;
	cursor: pointer;
  margin-top: 1px;
  width: 4px;
  border-radius: 1px;
  height: 8px;
  box-shadow: 0 0 2px rgb(0 0 0 / 60%);
  background: #fff;
  transform: translateX(-2px);
}
</style>
