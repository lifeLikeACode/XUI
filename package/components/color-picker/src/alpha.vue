<template>
  <div
    ref="alphaSlider"
    @click="handlerClick"
    :class="[prefix + '-alpha-slider']"
  >
    <!-- 透明格子面板 -->
    <div :class="[prefix + '-alpha-checkerboard-wrap']">
      <div :class="[prefix + '-alpha-checkerboard']"></div>
    </div>
    <!-- 渐变色 -->
    <div :class="[prefix + '-alpha-gradient']"></div>
    <!-- 滑块 -->
    <div
      @mousedown="handlerMouseDown"
      :style="style"
      :class="[prefix + '-alpha-pointer']"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      prefix: "color-picker",
      alphaSlider: {
        width: 0,
        left: 0,
        x: 0
      },
      pointer: {
        left: 1
      }
    };
  },
  computed: {
    alpha: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
        this.$emit("change-alpha", val);
      }
    },
    style() {
      return {
        left: this.alpha * 100 + "%"
      };
    }
  },
  methods: {
    handlerClick(e) {
      console.log(e);
      e.preventDefault();
      const offsetLeft =
        (e.clientX - this.alphaSlider.left) / this.alphaSlider.width;
      this.alpha = offsetLeft < 0 ? 0 : offsetLeft > 1 ? 1 : offsetLeft;
      // this.$emit("change-alpha", offsetLeft);
    },
    handlerMouseDown(e) {
      document.addEventListener("mousemove", this.handlerMouseMove);
      document.addEventListener("mouseup", this.handlerMouseUp);
    },
    handlerMouseMove(e) {
      e.preventDefault();
      const offsetLeft =
        (e.clientX - this.alphaSlider.left) / this.alphaSlider.width;
      this.alpha = offsetLeft < 0 ? 0 : offsetLeft > 1 ? 1 : offsetLeft;
      // this.$emit("change-alpha", offsetLeft);
    },
    handlerMouseUp(e) {
      document.removeEventListener("mousemove", this.handlerMouseMove);
      document.removeEventListener("mouseup", this.handlerMouseUp);
    }
  },
  mounted() {
    const { width, left, x } = this.$refs.alphaSlider.getBoundingClientRect();
    this.alphaSlider = {
      width,
      left,
      x
    };
  }
};
</script>

<style lang="stylus" scoped>
.color-picker{
  &-alpha-gradient{
    position:absolute;
    width:100%;
    height:10px;
    background:linear-gradient(to right,transparent,#000)
  }
  &-checkerboard-wrap{
    position:absolute;
    width:100%;
    height:10px;
  }
}
.color-picker-alpha-slider {
  cursor: pointer;
	position:relative;
	width:240px;
	height:10px;
	margin-top: 10px;
}
.color-picker-alpha-checkerboard{
	position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGUlEQVQYV2M4gwH+YwCGIasIUwhT25BVBADtzYNYrHvv4gAAAABJRU5ErkJggg==")
}
.color-picker-alpha-pointer {
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
