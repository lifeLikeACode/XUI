<template>
  <svg class="x-icon">
    <use
      :xlink:href="`#i-${name}`"
      :style="style"
    ></use>
  </svg>
</template>
<script>
export default {
  name: "xicon",
  props: {
    name: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: ""
    }
  },
  computed: {
    style() {
      return {
        fill: this.color || ""
      };
    }
  }
};
</script>
<style lang="stylus">
@import '../../../styles/component/icon.styl';
</style>
