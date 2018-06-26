<template>
  <div class="x-col" :class="{[`x-col-${span}`]:span}">
    <slot/>
  </div>
</template>
<script>
export default {
  name: 'xcol',
  props: {
    span: [Number, String]
  },
  computed: {

  }
}
</script>
<style lang="stylus">
  .x-col
    color #fff
    font-size 13px
    line-height 30px
    text-align center
    margin-bottom 10px
    background-clip content-box
    &:nth-child(odd)
      background #39a9ed
    &:nth-child(even)
      background #66c6f2
  for num,i in 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24
    .x-col-{num}
      width (i*100% / 24 )
</style>
