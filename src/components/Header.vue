<template>
  <div id="board-header">
    <div class="header-left">{{ title }}</div>
    <div class="header-center">
      <slot name="center">
        <span>{{ time }}</span>
        <span>{{ week }}</span>
      </slot>
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
import { getFormatTime } from '@/utils'

export default {
  name: 'BoardHeader',
  props: {
    title: {
      type: String,
      default: '数据看板'
    },
    optionList: {
      type: Array,
      default () {
        return [ { text: '无选项', value: 'no-option' } ]
      }
    }
  },
  data () {
    return {
      selected: '',
      time: getFormatTime(),
      week: getFormatTime(true)
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
    // 选项列表处理
    if (this.optionList[0].text === '无选项') {
      this.selected = 'no-option'
    } else {
      this.selected = this.optionList[0].value
    }
  },
  mounted () {
    setInterval(_ => {
      this.time = getFormatTime()
    }, 1000)
  }
}
</script>

<style lang="scss">
  #board-header {
    height: 60px;
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    position: relative;

    .header-left {
      font-size: 30px;
      font-weight: bold;
    }
    
    .header-center {
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
