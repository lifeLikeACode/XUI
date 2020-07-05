<template>
  <span class="switch-label">
    <input
      class="switch-checkbox"
      type="checkbox"
      :disabled="disabled"
      :checked="switchValue === trueValue"
    />
    <span
      :class="['switch',{'switch-active': switchValue === trueValue},{'switch-inactive': switchValue === falseValue},{'switch-disabled':disabled}]"
      @click="changeSwitch"
    >
      <span class="open-text">
        <slot
          name="open"
          v-if="switchValue === falseValue"
        ><span>关</span></slot>
      </span>
      <span class="close-text">
        <slot
          name="close"
          v-if="switchValue === trueValue"
        ><span>开</span></slot>
      </span>
    </span>

  </span>
</template>

<script>
export default {
  name: "xswitch",
  props: {
    value: {
      type: [String, Boolean, Number],
      default: false
    },
    "true-value": {
      type: [String, Boolean, Number],
      default: true
    },
    "false-value": {
      type: [String, Boolean, Number],
      default: false
    },
    ["before-change"]: {
      type: Function,
      default: () => {
        return () => {};
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      //switchValue: this.value === this.trueValue ? true : false
    };
  },
  watch: {
    // value(val) {
    //   this.switchValue = val === this.trueValue ? true : false;
    //   this.$emit("input", val);
    // }
  },
  computed: {
    switchValue: {
      get() {
        return this.value === this.trueValue ? this.trueValue : this.falseValue;
      },
      set(val) {
        const value = val === this.trueValue ? this.trueValue : this.falseValue;
        this.$emit("input", value);
      }
    }
  },
  methods: {
    changeSwitch() {
      if (this.disabled) return;
      const beforeChange = this.beforeChange();
      if (beforeChange && beforeChange.then) {
        beforeChange
          .then(() => {
            this.switchValue =
              this.switchValue === this.trueValue
                ? this.falseValue
                : this.trueValue;
          })
          .catch(err => {
            this.switchValue = this.switchValue;
          });
      } else {
        this.switchValue =
          this.switchValue === this.trueValue
            ? this.falseValue
            : this.trueValue;
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '../../../styles/component/switch.styl';
</style>