<template>
  <div>
    <section class="main2"></section>
    <div class="main">
      <xrow :gutter="20">
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
      <xrow type="flex">
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
        <xbutton iconName="left" :inline="true" @click="show($event)"
          >图标按钮</xbutton
        >
        <xbutton
          iconName="right"
          iconPosition="right"
          :inline="true"
          @click="show($event)"
          >普通按钮</xbutton
        >
      </xgroupButton>
      <xbutton
        iconName="smiling"
        iconPosition="left"
        :loading="loading1"
        :inline="true"
        @click="show($event)"
        :danger="true"
        >危险按钮</xbutton
      >
      <xbutton
        iconName="smiling"
        iconPosition="right"
        :disabled="true"
        :inline="true"
        @click="show($event)"
        :danger="true"
        >禁用按钮</xbutton
      >

      <xbutton :inline="true" @click="show($event)">图标按钮</xbutton>
      <xbutton
        iconName="right"
        iconPosition="right"
        :inline="true"
        @click="show($event)"
        >普通按钮</xbutton
      >

      <xbutton :disabled="false" @click="showDialog($event)">
        normal
      </xbutton>
      <xbutton
        :loading="loading1"
        @click="clickLoading($event)"
        :primary="true"
      >
        primary
      </xbutton>

      <xbutton
        :loading="loading1"
        iconPosition="right"
        @click="clickLoading($event)"
        :danger="true"
      >
        danger
      </xbutton>
      <xbutton
        iconName="smiling"
        :disabled="true"
        @click="show($event)"
        :danger="true"
      >
        disabled
      </xbutton>
      <!-- <xswiper :loop="false" :autoplay="1000">
        <xswiperItem>
          <p style="text-align:center;line-height:200px;color:#ffffff;">1</p>
        </xswiperItem>
        <xswiperItem>
          <p style="text-align:center;line-height:200px;color:#ffffff;">2</p>
        </xswiperItem>
        <xswiperItem>
          <p style="text-align:center;line-height:200px;color:#ffffff;">3</p>
        </xswiperItem>
      </xswiper> -->

      <xpicker
        title="标题"
        :columns="[
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          17,
          18,
          19,
          20,
          21,
          22,
          23
        ]"
      ></xpicker>
      <!-- <xscroll v-model="dataList" class="x-scroll-style"></xscroll> -->
      <!-- <xswiper :vertical="true">
        <xswiperItem>
          <p style="text-align:center;line-height:200px;color:#ffffff;">1</p>
        </xswiperItem>
        <xswiperItem>
          <p style="text-align:center;line-height:200px;color:#ffffff;">2</p>
        </xswiperItem>
        <xswiperItem>
          <p style="text-align:center;line-height:200px;color:#ffffff;">3</p>
        </xswiperItem>
      </xswiper>
      <br>
      <xswiper :touchable="false">
        <xswiperItem>
          <p style="text-align:center;line-height:200px;color:#ffffff;">1</p>
        </xswiperItem>
        <xswiperItem>
          <p style="text-align:center;line-height:200px;color:#ffffff;">2</p>
        </xswiperItem>
        <xswiperItem>
          <p style="text-align:center;line-height:200px;color:#ffffff;">3</p>
        </xswiperItem>
      </xswiper>
      <br />-->
      <!-- <xdialog
        cancel="否"
        confirm="是"
        title="自定义标题"
        ref="dialog"
        v-model="dialogShow"
        @confrim="closeDialog($event)"
        @cancle="closeDialog($event)"
        @maskClick="closeDialog($event)"
      >
        此处填写内容
      </xdialog> -->
    </div>
  </div>
</template>
<script>
var arr = [];
arr.length = 100;
export default {
  name: "HelloWorld",
  data() {
    return {
      loading1: false,
      dialogShow: false,
      dataList: arr.fill(1, 0, 100)
    };
  },
  components: {},
  methods: {
    show(e) {},
    clickLoading(e) {
      this.loading1 = !this.loading1;
    },
    closeDialog(e) {
      this.$refs.dialog.close();
    },
    showDialog(e) {
      // eslint-disable-next-line
      // this.$refs.dialog.show();
      this.$dialog({
        title: "标题",
        content: "内容",
        footer: "footer"
      });
      // eslint-disable-next-line
      //console.log(this.$dialog)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
html, body {
  width 100%
  margin 0
  padding 0
  border none
  text-decoration none

  .main {
    padding 0 10px

    button {
      margin 10px 0
    }

    .x-row {
      .x-button {
        margin 0
      }
    }
  }

  .main2 {
    // margin: 10px 0;
  }
}
.x-scroll-style{
  border: 1px solid #000;
  margin: 0 auto;
  height: 500px;
  width: 80%;
  // transform: translateY(0%);
}
</style>
