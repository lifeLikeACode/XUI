<template>
  <div class="x-col" :class="{[`x-col-${span}`]:span , [`x-col-offset-${offset}`] :offset }" :style="styles" >
    <slot/>
  </div>
</template>
<script>
export default {
  name: 'xcol',
  props: {
    span: [Number, String],
    offset: [Number, String]
  },
  computed: {
    styles () {
      const gutter = `${this.$parent.gutter / 2}px`
      return gutter ? {paddingLeft: gutter, paddingRight: gutter} : {}
    }
  }
}
</script>
<style lang="stylus">
  .x-col
    box-sizing border-box
    float left
    color #fff
    font-size 13px
    line-height 30px
    text-align center
    margin-bottom 10px
    background-clip content-box
    &:nth-child(odd)
      background-color #39a9ed
    &:nth-child(even)
      background-color #66c6f2
  for num,i in 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24
    .x-col-{num}
      width (num * 100% / 24 )
    .x-col-offset-{num}
      margin-left (num * 100% / 24)
</style>
