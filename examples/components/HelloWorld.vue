<template>
  <div>
    <section class="main2">
      <xscroll></xscroll>
    </section>
    <div class="main">
      <xrow :gutter="20" >
        <xcol :span="8">
          span：8
        </xcol>
        <xcol :span="8">
          span：8
        </xcol>
        <xcol :span="8">
          span：8
        </xcol>
      </xrow>
      <xrow type="flex" justify="center">
        <xcol :span="8" :offset="1">
          span 8
        </xcol>
        <xcol :span="6" :offset="1">
          span 6
        </xcol>
      </xrow>
      <xrow type="flex" >
        <xcol :span="6">
          span 6
        </xcol>
        <xcol :span="6">
          span 6
        </xcol>
        <xcol :span="6">
          span 6
        </xcol>
      </xrow>
      <xrow type="flex" justify="center">
        <xcol :span="12" :offset="12">
          offset : 12 span: 12
        </xcol>
      </xrow>
      <xgroupButton>
        <xbutton iconName="left" :inline="true" @click="show($event)">图标按钮</xbutton>
        <xbutton iconName="right" iconPosition="right" :inline="true" @click="show($event)">普通按钮</xbutton>
      </xgroupButton>
      <xbutton iconName="smiling" iconPosition="left" :loading="loading1"  :inline="true" @click="show($event)"  :danger="true">危险按钮</xbutton>
      <xbutton iconName="smiling" iconPosition="right" :disabled="true" :inline="true" @click="show($event)"  :danger="true">禁用按钮</xbutton>

      <xbutton :inline="true" @click="show($event)">图标按钮</xbutton>
      <xbutton iconName="right" iconPosition="right" :inline="true" @click="show($event)">普通按钮</xbutton>

      <xbutton :disabled="false" @click="showDialog($event)">
        normal
      </xbutton>
      <xbutton :loading="loading1" @click="clickLoading($event)" :primary="true">
        primary
      </xbutton>

      <xbutton :loading="loading1" iconPosition="right"  @click="clickLoading($event)"  :danger="true">
        danger
      </xbutton>
      <xbutton iconName="smiling" :disabled="true" @click="show($event)"  :danger="true">
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

  </div>
</template>

<script>

export default {
  name: 'HelloWorld',
  data () {
    return {
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
      this.dialogShow = true
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
    .main2
      margin 10px 0
</style>
