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
      <xrow
        type="flex"
        justify="center"
      >
        <xcol
          :span="8"
          :offset="1"
        >
          span 8
        </xcol>
        <xcol
          :span="6"
          :offset="1"
        >
          span 6
        </xcol>
      </xrow>
      <xrow type="flex">
        <xcol :span="8">
          <p>禁用</p>
          <xswitch
            v-model="switch2"
            :disabled="true"
          ></xswitch>
        </xcol>
        <xcol :span="8">
          <p>待确认弹窗的切换</p>
          <xswitch
            v-model="switch1"
            true-value="T"
            false-value="F"
            :beforeChange="switchBeforeChange"
          >
            <span slot="open">×</span>
            <span slot="close">√</span>

          </xswitch>

        </xcol>
        <xcol :span="8">
          <p>普通切换</p>
          <xswitch v-model="switch2"></xswitch>
        </xcol>
      </xrow>
      <xrow
        type="flex"
        justify="center"
      >
        <xcol
          :span="12"
          :offset="12"
        >
          offset : 12 span: 12
        </xcol>
      </xrow>
      <xgroupButton>
        <xbutton
          iconName="left"
          :inline="true"
          @click="show($event)"
        >图标按钮</xbutton>
        <xbutton
          iconName="right"
          iconPosition="right"
          :inline="true"
          @click="show($event)"
        >普通按钮</xbutton>
      </xgroupButton>
      <xbutton
        iconName="smiling"
        iconPosition="left"
        :loading="loading1"
        :inline="true"
        @click="show($event)"
        :danger="true"
      >危险按钮</xbutton>
      <xbutton
        iconName="smiling"
        iconPosition="right"
        :disabled="true"
        :inline="true"
        @click="show($event)"
        :danger="true"
      >禁用按钮</xbutton>

      <xbutton
        :inline="true"
        @click="show($event)"
      >图标按钮</xbutton>
      <xbutton
        iconName="right"
        iconPosition="right"
        :inline="true"
        @click="show($event)"
      >普通按钮</xbutton>

      <xbutton
        :disabled="false"
        @click="showNormalDialog"
      >
        normalDialog
      </xbutton>
      <xbutton
        :loading="loading1"
        @click="showDialogAlert($event)"
        :primary="true"
      >
        alert
      </xbutton>

      <xbutton
        :loading="loading1"
        iconPosition="right"
        @click="showDialogConfirm($event)"
        :danger="true"
      >
        confirm
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
      <xdialog
        cancel="否"
        confirm="是"
        title="自定义标题"
        ref="dialog"
        v-model="dialogShow"
        @confrim="closeDialog($event)"
        @cancle="closeDialog($event)"
        @maskClick="closeDialog($event)"
      >
        <p> 此处填写内容</p>
        <div><img
            style="width:200px;"
            src="https://img.yzcdn.cn/vant/apple-3.jpg"
          /></div>
        <div slot="footer">
          <p>自定义footer</p>
        </div>
      </xdialog>
    </div>
    <xpicker
      style="border:1px solid #000"
      title="标题"
      :columns="[first, second, third]"
      label="label"
      :data="[2, 1, 0]"
      @change="changePicker"
    ></xpicker>
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
      dataList: arr.fill(1, 0, 100),
      switch1: "T",
      switch2: false,
      first: [
        { label: "浙江", value: "ZJ" },
        { label: "福建", value: "FJ" },
        { label: "北京", value: "BJ" },
        { label: "江苏", value: "JS" },
        { label: "宁波", value: "NB" },
        { label: "温州", value: "WZ" }
      ],
      second: [
        { label: "浙江", value: "ZJ" },
        { label: "福建", value: "FJ" },
        { label: "宁波", value: "NB" },
        { label: "温州", value: "WZ" }
      ],
      third: [
        { label: "浙江", value: "ZJ" },
        { label: "福建", value: "FJ" }
      ]
    };
  },
  components: {},
  methods: {
    switchBeforeChange() {
      return new Promise((resolve, reject) => {
        this.$dialog.confirm({
          title: "切换",
          content: "是否切换",
          loading: false,
          onOk: () => {
            resolve();
          },
          onCancel: () => {}
        });
      });
    },
    show(e) {
      this.loading1 = !this.loading1;
    },
    showNormalDialog() {
      this.dialogShow = true;
    },
    clickLoading(e) {},
    closeDialog(e) {
      this.$refs.dialog.close();
    },
    showDialogAlert(e) {
      this.$dialog.alert({
        title: "标题",
        content: "内容"
      });
    },
    showDialogConfirm(e) {
      const dialog = this.$dialog.confirm({
        title: "标题",
        content: "内容",
        loading: true,
        onOk: () => {
          console.log("on-ok");
          setTimeout(() => {
            dialog.remove();
          }, 3000);
        },
        onCancel: () => {
          console.log("on-cancel");
        }
        // footer: "footer"
      });
    },

    changePicker(column) {
      console.log(column);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
html, body {
  width: 100%;
  margin: 0;
  padding: 0;
  border: none;
  text-decoration: none;

  .main {
    padding: 0 10px;

    button {
      margin: 10px 0;
    }

    .x-row {
      .x-button {
        // margin: 0;
      }
    }
  }

  .main2 {
    // margin: 10px 0;
  }
}

.x-scroll-style {
  border: 1px solid #000;
  margin: 0 auto;
  height: 500px;
  width: 80%;
  // transform: translateY(0%);
}
</style>
