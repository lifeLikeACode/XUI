<template>
  <div class="overlay">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "xoverlay"
};
</script>

<style lang="stylus" scoped>
.overlay
  position absolute
  width 100%
  height 100%
  top 0px
  left 0px
  background rgba(0,0,0,0.6)
</style>
