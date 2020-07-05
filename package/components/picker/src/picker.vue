<template>
  <div class="picker">
    <div class="picker-header">
      <button
        @click="cancel"
        class="picker-header-button picker-header-button__cancel"
      >
        {{ cancelText }}
      </button>
      <div>
        <slot name="title">{{ title }}</slot>
      </div>
      <button
        @click="confirm"
        class="picker-header-button picker-header-button__confirm"
      >
        {{ confirmText }}
      </button>
    </div>

    <div
      class="picker-scroll-wrapper"
      @touchstart.prevent="pickerScrollWrapperTouchStart"
    >
      <div
        class="picker-scroll-column"
        v-for="(column, idx) in columns"
        :key="idx"
      >
        <scroll
          :acceleration="0.01"
          :overflowHidden="false"
          :noBounce="300"
          :pickResetBounce="300"
          :pickerHeight="pickerHeight"
          @get-picker-index="changePickerIndex(idx, ...arguments)"
          ref="scroll"
          class="picker-scroll-container"
        >
          <div
            v-for="item in column"
            :key="item.value"
            class="picker-scroll-row"
          >
            <p class="picker-scroll-row-text">
              {{ label ? item[label] : item }}
            </p>
          </div>
        </scroll>
      </div>
      <div class="picker-mask"></div>
      <div class="picker-select-row"></div>
    </div>
  </div>
</template>

<script>
import scroll from "../../scroll/src/scroll";

export default {
  name: "xpicker",
  components: {
    scroll
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    "cancel-text": {
      type: String,
      default: "取消"
    },
    "confirm-text": {
      type: String,
      default: "确认"
    },
    columns: {
      type: Array,
      default: () => {
        return [];
      }
    },
    data: {
      type: Array,
      default: () => {
        return [];
      }
    },
    label: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      pickerHeight: 44
    };
  },
  methods: {
    pickerScrollWrapperTouchStart() {},
    confirm() {
      this.$emit("confirm");
    },
    cancel() {
      this.$emit("cancel");
    },
    changePickerIndex(idx, index) {
      const column = this.columns[idx][index];
      // data[idx] = index
      console.log(column);
      this.$emit("change", column);
    },
    initColumnIndex() {
      this.data.forEach((item, index) => {
        this.$refs[`scroll`][index].goTo(item * -this.pickerHeight);
      });
    }
  },
  mounted() {
    this.initColumnIndex();
  }
};
</script>

<style lang="stylus" scoped>
@import '../../../styles/component/picker.styl';
</style>
