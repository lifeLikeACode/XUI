<template>
  <div>
    <xbutton :disabled="false" :inline="true" @click="show($event)">inline-normal</xbutton>
    <xbutton :disabled="false" :inline="true" @click="show($event)" :primary="true">inline-primary </xbutton>
    <xbutton :disabled="false" :inline="true" @click="show($event)" :icon="pic" :danger="true">inline-danger</xbutton>
    <xbutton :disabled="true" :inline="true" @click="show($event)" :icon="pic" :danger="true">disabled</xbutton>

    <xbutton :disabled="false" @click="show($event)">
      normal
    </xbutton>

    <xbutton :disabled="false" @click="show($event)" :primary="true">
      primary
    </xbutton>

    <xbutton :disabled="false" @click="show($event)" :icon="pic" :danger="true">
      danger
    </xbutton>
    <xbutton  :disabled="true" @click="show($event)" :icon="pic" :danger="true">
      disabled
    </xbutton>
    <xswiper>
      <xswiperItem>
        <p style="text-align:center;line-height:200px;color:#ffffff;">1</p>
      </xswiperItem>
      <xswiperItem><p style="text-align:center;line-height:200px;color:#ffffff;">2</p></xswiperItem>
      <xswiperItem><p style="text-align:center;line-height:200px;color:#ffffff;">3</p></xswiperItem>
    </xswiper>

    <br>
    <xswiper :vertical="true">
      <xswiperItem>
        <p style="text-align:center;line-height:200px;color:#ffffff;">1</p>
      </xswiperItem>
      <xswiperItem><p style="text-align:center;line-height:200px;color:#ffffff;">2</p></xswiperItem>
      <xswiperItem><p style="text-align:center;line-height:200px;color:#ffffff;">3</p></xswiperItem>
    </xswiper>
    <br>
    <xswiper :touchable="false">
      <xswiperItem>
        <p style="text-align:center;line-height:200px;color:#ffffff;">1</p>
      </xswiperItem>
      <xswiperItem><p style="text-align:center;line-height:200px;color:#ffffff;">2</p></xswiperItem>
      <xswiperItem><p style="text-align:center;line-height:200px;color:#ffffff;">3</p></xswiperItem>
    </xswiper>
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
    show (e) {
      console.log(e)
      console.log(this)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
  html,body
    width 100%
    marign 0
    padding 0
    border none
    text-decoration none
    button

      margin 10px 0
</style>
