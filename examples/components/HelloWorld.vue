<template>
  <div class="main">
    <xgroupButton>
      <xbutton iconName="left" :inline="true" @click="show($event)">图标按钮</xbutton>
      <xbutton iconName="right" iconPosition="right" :inline="true" @click="show($event)">普通按钮</xbutton>
    </xgroupButton>

    <xbutton :inline="true" @click="show($event)" :icon="pic" :danger="true">危险按钮</xbutton>
    <xbutton iconName="smiling" iconPosition="right" :disabled="true" :inline="true" @click="show($event)" :icon="pic" :danger="true">禁用按钮</xbutton>

    <xbutton iconName="download" :disabled="false" @click="show($event)">
      normal
    </xbutton>

    <xbutton :loading="loading1" @click="clickLoading($event)" :primary="true">
      primary
    </xbutton>

    <xbutton :loading="loading1" iconPosition="right"  @click="clickLoading($event)" :icon="pic" :danger="true">
      danger
    </xbutton>
    <xbutton iconName="smiling" :disabled="true" @click="show($event)" :icon="pic" :danger="true">
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
    <br/>
    <xdialog :show="true" @confrim="closeDialog($event)" @cancle="closeDialog($event)" ></xdialog>
  </div>
</template>

<script>

export default {
  name: 'HelloWorld',
  data () {
    return {
      pic: 'pic',
      msg: 'Welcome to Your Vue.js App',
      loading1: false
    }
  },
  components: {
  },
  methods: {
    show (e) {

    },
    clickLoading (e) {
      this.loading1 = !this.loading1
    },
    closeDialog (e) {

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
    .main
      padding 0 10px
      button
        margin 10px 0
</style>
