<template>
  <div class="split-pane" ref="wrapper">
    <div class="pane pane-left" :style="{ width: leftWidthPercent }">
      <slot name="left"/>
    </div>
    <div class="pane-seekbar" :style="{ width: seekbarWidth + 'px' }" @mousedown="handleMousedown">
      <div class="decorate">
        <i v-for="i in 8" :key="i" v-once :style="{ width: seekbarWidth + 'px' }"></i>
      </div>
    </div>
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
    },
    min: {
      type: Number,
      default: 0.2
    },
    max: {
      type: Number,
      default: 0.8
    }
  },
  data () {
    return {
      initOffset: 0
    }
  },
  computed: {
    leftWidthPercent () {
      return `${this.defaultOffset * 100}%`
    },
    rightWidthPercent () {
      return `${(1 - this.defaultOffset) * 100}%`
    }
  },
  watch: {
    defaultOffset () {
      this.$emit('offset-change')
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
      let offset = (e.pageX - this.initOffset - wrapperRect.left) / (wrapperRect.width - this.seekbarWidth)
      if (offset < this.min) offset = this.min
      if (offset > this.max) offset = this.max
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
    overflow: hidden;
    
    .pane-seekbar {
      border: 1px solid #ccc;
      border-top: none;
      border-bottom: none;
      background: #f8f8f9;
      flex: none;  // 不让拖动条收缩
      cursor: col-resize;
      position: relative;
      
      .decorate {
        position: absolute;
        top: 50%;
        width: 100%;
        height: 32px;
        transform: translate(0, -50%);
        
        > i {
          height: 2px;
          background: #ccc;
          margin-top: 3px;
          display: flex;
        }
      }
    }
  }
</style>
