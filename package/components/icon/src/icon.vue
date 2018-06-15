<template>
  <svg class="x-icon">
    <use :xlink:href="`#i-${name}`"></use>
  </svg>
</template>
<script>
export default {
  name: 'xicon',
  props: ['name']
}
</script>
<style lang="stylus">
  @import  '../../../styles/component/icon.styl'
</style>
