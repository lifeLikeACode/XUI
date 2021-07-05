<template>
  <div ref="saturation" :class="[prefix + '-saturation-wrapper']">
    <div
      @mousedown="handlerDown"
      :style="paneStyle"
      :class="[prefix + '-saturation']"
    ></div>
    <div
      @mousedown="handlerMouseDown"
      :class="[prefix + '-dot']"
      :style="style"
    ></div>
  </div>
</template>
<script>
export default {
  props: {
    hue: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      prefix: "color-picker",
      dot: {
        x: 0.8,
        y: 0.8
      },
      pane: {
        width: 0,
        height: 0
      },
      coordinate: {
        x: 0,
        y: 0
      }
    };
  },
  computed: {
    paneStyle() {
      return {
        background: `hsl(${this.hue},100%,50%,1)`
      };
    },
    style() {
      return {
        left: this.dot.x * 100 + "%",
        bottom: this.dot.y * 100 + "%"
      };
    }
  },
  watch: {
    hue: {
      handler(val) {
        // const { r, g, b } = hsv2rgb(val, this.dot.x, this.dot.y);
        // this.$emit("change-color", { r, g, b });
      }
    }
  },
  methods: {
    handlerMouseDown(e) {
      console.dir(e.target);
      document.addEventListener("mousemove", this.handlerMouseMove);
      document.addEventListener("mouseup", this.handlerMouseUp);
    },
    handlerDown(e) {
      this.dot.x = (e.clientX - this.coordinate.x) / this.pane.width;
      this.dot.y = (this.coordinate.y - e.clientY) / this.pane.height;

      this.$emit("change-color", { s: this.dot.x, v: this.dot.y });
      document.addEventListener("mousemove", this.handlerMouseMove);
      document.addEventListener("mouseup", this.handlerMouseUp);
    },
    handlerMouseMove(e) {
      e.preventDefault();
      this.dot.x =
        (e.clientX - this.coordinate.x) / this.pane.width > 1
          ? 1
          : (e.clientX - this.coordinate.x) / this.pane.width < 0
          ? 0
          : (e.clientX - this.coordinate.x) / this.pane.width;
      this.dot.y =
        (this.coordinate.y - e.clientY) / this.pane.height > 1
          ? 1
          : (this.coordinate.y - e.clientY) / this.pane.height < 0
          ? 0
          : (this.coordinate.y - e.clientY) / this.pane.height;
      this.$emit("change-color", { s: this.dot.x, v: this.dot.y });
    },
    handlerMouseUp(e) {
      document.removeEventListener("mousemove", this.handlerMouseMove);
      document.removeEventListener("mouseup", this.handlerMouseUp);
    }
  },
  mounted() {
    const {
      width,
      height,
      x,
      y
    } = this.$refs.saturation.getBoundingClientRect();
    this.pane = {
      width,
      height
    };
    this.coordinate = {
      x: x,
      y: y + height
    };
  }
};
</script>

<style lang="stylus" scoped>
.color-picker {
  &-saturation-wrapper{
    position relative;
    width:240px;
    height:124px;
  }
  &-saturation{
      width:240px;
      height:124px;
      cursor pointer
      position relative;
      &::after {
        content:"";
        position: absolute;
        background: linear-gradient(to top,#000,rgba(0,0,0,0))
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
      }
      &::before {
        content:"";
        position: absolute;
        background: linear-gradient(to right,#fff,rgba(0,0,0,0))
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
      }
    }
  &-dot{
    position:absolute;
    cursor pointer
    width 8px;
    height 8px;
    border-radius 50%;
    border: 2px solid white;
    transform: translate(-6px, 6px);
    box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
    // border 1px solid #ffffff;
    //box-shadow: 0 0 0 1.5px #fff, inset 0 0 1px 1px rgb(0 0 0 / 30%), 0 0 1px 2px rgb(0 0 0 / 40%);
  }
}
</style>
