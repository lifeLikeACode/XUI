<template>
  <div>
    <div
      class="block"
      :style="
        `background:rgba(${color.rgba.r},${color.rgba.g},${color.rgba.b},${color.rgba.a});width:20px;height:20px;`
      "
    ></div>
    <div :class="prefix">
      <saturation
        @change-color="changeSaturationAndValue"
        :hue="color.hue"
        :saturation="color.hsv.s"
        :lightness="color.hsv.v"
      ></saturation>
      <hue v-model="color.hue" @change-hue="changeHue"></hue>
      <alpha v-model="color.rgba.a" @change-alpha="changeAlpha"> </alpha>
    </div>
  </div>
</template>
<script>
import alpha from "./alpha.vue";
import hue from "./hue.vue";
import saturation from "./saturation.vue";
import { hex2rgb, rgb2hex, hsv2rgb, rgb2hsl, rgb2hsv } from "./utils";
export default {
  name: "ColorPicker",
  components: { alpha, hue, saturation },
  props: {
    value: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      prefix: "color-picker",
      color: this.changeColorValue()
    };
  },
  watch: {
    value: {
      handler(val) {
        this.color = this.changeColorValue();
      }
    }
  },
  computed: {},
  methods: {
    changeColorValue() {
      const { r, g, b, a } = hex2rgb(this.value);
      const { h, s, l } = rgb2hsl(r, g, b);
      const color = {
        rgba: {
          r,
          g,
          b,
          a
        },
        hue: this.color && this.color.hue ? this.color.hue : h,
        hsl: {
          h: this.color && this.color.hue ? this.color.hue : h,
          s,
          l,
          a
        },
        hsv: {
          ...rgb2hsv(r, g, b),
          h: this.color && this.color.hue ? this.color.hue : h,
          a
        },
        hex: this.value
      };
      return color;
    },
    changeSaturationAndValue({ s, v }) {
      const { hue } = this.color;
      const { a } = this.color.rgba;
      const { r, g, b } = hsv2rgb(hue, s, v);
      const colorString = rgb2hex(r, g, b, a);
      this.$emit("input", colorString);
    },
    changeHue(hue) {
      const { a } = this.color.rgba;
      const { s, v } = this.color.hsv;
      const { r, g, b } = hsv2rgb(hue, s, v);
      const colorString = rgb2hex(r, g, b, a * 255);
      this.$emit("input", colorString);
    },
    changeAlpha(alpha) {
      const { hue } = this.color;
      const { s, v } = this.color.hsv;
      const { r, g, b } = hsv2rgb(hue, s, v);
      const colorString = rgb2hex(r, g, b, alpha * 255);
      this.$emit("input", colorString);
    }
  }
};
</script>
<style lang="stylus" scoped>
.color-picker{
  position:absolute;
  left:400px;
	width:240px;
	height:321px;
	border:1px solid #000;
	margin: 0 auto;

}
</style>
