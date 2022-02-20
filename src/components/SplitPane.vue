<template>
  <div class="split-pane" ref="wrapper">
    <div class="pane pane-left" :style="{ width: leftWidthPercent }">
      <slot name="left"/>
    </div>
    <div class="pane-seekbar" :style="{ width: seekbarWidth + 'px' }" @mousedown="handleMousedown"></div>
    <div class="pane pane-right" :style="{ width: rightWidthPercent }">
      <slot name="right"/>
    </div>
  </div>
</template>

<script>
import { throttle } from '@/utils'

export default {
  name: 'SplitPane',
  props: {
    seekbarWidth: {
      type: Number,
      default: 8
    },
    defaultOffset: {
      type: Number,
      default: 0.5
    }
  },
  data () {
    return {
      initOffset: 0
    }
  },
  computed: {
    leftWidth () {
      // 边界判断
      return this.defaultOffset > 1 ? 1 : (this.defaultOffset < 0 ? 0 : this.defaultOffset) 
    },
    leftWidthPercent () {
      return `${this.leftWidth * 100}%`
    },
    rightWidthPercent () {
      return `${(1 - this.leftWidth) * 100}%`
    }
  },
  methods: {
    handleMousedown (e) {
      this.throttleHandleMousemove = throttle(this.handleMousemove, 50)
      document.addEventListener('mousemove', this.throttleHandleMousemove)
      document.addEventListener('mouseup', this.handleMouseup)
      this.initOffset = e.pageX - e.target.getBoundingClientRect().left
      this.$refs.wrapper.style.cursor = 'col-resize'
    },
    handleMousemove (e) {
      // getBoundingClientRect().left 获取距离视口的左偏移
      // getBoundingClientRect().width 获取元素总宽度，包含padding和border
      const wrapperRect = this.$refs.wrapper.getBoundingClientRect()
      const offset = (e.pageX- this.initOffset - wrapperRect.left) / (wrapperRect.width - this.seekbarWidth)
      this.$emit('update:default-offset', offset)
    },
    handleMouseup () {
      this.$refs.wrapper.style.cursor = 'auto'
      document.removeEventListener('mousemove', this.throttleHandleMousemove)
      document.removeEventListener('mouseup', this.handleMouseup)
    }
  }
}
</script>

<style lang="scss">
  .split-pane {
    height: 100%;
    display: flex;
    user-select: none;
    
    .pane-seekbar {
      background: red;
      flex: none;  // 不让拖动条收缩
      cursor: col-resize;
    }
  }
</style>
