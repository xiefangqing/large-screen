<template>
  <div class="header">
    <div :class="['header-left', titleClass]">{{ title }}</div>
    <div class="header-center">
      <slot name="center"/>
    </div>
    <div class="header-right">
      <slot>
        <h3>
          <select v-model="selected">
            <option v-for="option in optionList" :value="option.value">{{ option.text }}</option>
          </select>
        </h3>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    title: {
      type: String,
      default: '数据看板'
    },
    optionList: {
      type: Array,
      required: true
    },
    titleClass: String
  },
  data () {
    return {
      selected: ''
    }
  },
  watch: {
    selected: {
      handler (newValue, oldValue) {
        if (this.selected) {
          this.$emit('selected', newValue)
        }
      },
      immediate: true
    }
  },
  created () {
    if (this.optionList && this.optionList.length) {
      this.selected = this.optionList[0].value
    } else {
      this.$emit('update:optionList', [{ text: '无选项', value: 'no-option' }])
      this.selected = 'no-option'
    }
  }
}
</script>

<style lang="scss" scoped>
  .header {
    height: 60px;
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    position: relative;

    &-left {
      font-size: 20px;
      font-weight: bold;
    }
    
    &-center {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 20px;
      display: flex;
      gap: 0 10px;
    }
  }
</style>
