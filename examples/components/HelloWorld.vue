<template>
  <div class="main">
    <xgroupButton>
      <xbutton iconName="left" :inline="true" @click="show($event)">图标按钮</xbutton>
      <xbutton iconName="right" iconPosition="right" :inline="true" @click="show($event)">普通按钮</xbutton>
    </xgroupButton>

    <xrow type="flex" justify="center">
      <xcol :span="18">
        <xbutton :inline="true" @click="show($event)" :icon="pic" :danger="true">危险按钮</xbutton>
        <xbutton iconName="smiling" iconPosition="right" :disabled="true" :inline="true" @click="show($event)" :icon="pic" :danger="true">禁用按钮</xbutton>
      </xcol>
      <xcol :span="6">span 12</xcol>
    </xrow>

    <xbutton iconName="download" :disabled="false" @click="showDialog($event)">
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
    <xdialog cancel="否" confirm="是" title="自定义标题" ref="dialog" :dialogShow="dialogShow" @confrim="closeDialog($event)" @cancle="closeDialog($event)" @maskClick="closeDialog($event)" >
      此处填写内容
    </xdialog>
  </div>
</template>

<script>

export default {
  name: 'HelloWorld',
  data () {
    return {
      pic: 'pic',
      loading1: false,
      dialogShow: false
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
      this.$refs.dialog.close()
    },
    showDialog (e) {
      this.dialogShow = !this.dialogShow
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
      .x-row
        .x-button
          margin 0
</style>
