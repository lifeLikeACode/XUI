<template>
  <div>
    <xbutton :disabled="false" :inline="true" @click="show()">
      inline-normal
    </xbutton>

    <xbutton :disabled="false" :inline="true" @click="show()" :primary="true">
      inline-primary
    </xbutton>
    <xbutton :disabled="false" :inline="true" @click="show()" :icon="pic" :danger="true">
      inline-danger
    </xbutton>

    <xbutton :disabled="false" @click="show()">
      normal
    </xbutton>

    <xbutton :disabled="false" @click="show()" :primary="true">
      primary
    </xbutton>

    <xbutton :disabled="false" @click="show()" :icon="pic" :danger="true">
      danger
    </xbutton>
  </div>
</template>

<script>

export default {
  name: 'HelloWorld',
  data () {
    return {
      pic: 'pic',
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
  },
  methods: {
    show () {
      // alert('接收点击事件')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
  button
    margin 10px 0
</style>
