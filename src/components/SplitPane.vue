<template>
  <div class="split-pane" ref="wrapper">
    <div class="pane pane-left" :style="{ width: leftWidthPercent }"></div>
    <div class="pane-seekbar" :style="{ width: seekbarWidth + 'px' }" @mousedown="handleMousedown"></div>
    <div class="pane pane-right" :style="{ width: rightWidthPercent }"></div>
  </div>
</template>

<script>
export default {
  name: 'SplitPane',
  model: {
    prop: 'defaultOffset',
    event: 'input'
  },
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
      canMove: false,
      initOffset: 0
    }
  },
  computed: {
    trueLeftWidth () {
      // 边界判断
      return this.defaultOffset > 1 ? 1 : (this.defaultOffset < 0 ? 0 : this.defaultOffset) 
    },
    leftWidthPercent () {
      return `${this.trueLeftWidth * 100}%`
    },
    rightWidthPercent () {
      return `${(1 - this.trueLeftWidth) * 100}%`
    }
  },
  methods: {
    handleMousedown (e) {
      document.addEventListener('mousemove', this.handleMousemove)
      document.addEventListener('mouseup', this.handleMouseup)
      this.initOffset = e.pageX - e.target.getBoundingClientRect().left
      this.canMove = true
    },
    handleMousemove (e) {
      if (this.canMove) {
        // getBoundingClientRect().left 获取距离视口的左偏移
        // getBoundingClientRect().width 获取元素总宽度，包含padding和border
        const wrapperRect = this.$refs.wrapper.getBoundingClientRect()
        const offset = (e.pageX- this.initOffset - wrapperRect.left) / (wrapperRect.width - this.seekbarWidth)
        this.$emit('input', offset)
      }
    },
    handleMouseup () {
      this.canMove = false
    }
  }
}
</script>

<style lang="scss">
  .split-pane {
    height: 100%;
    display: flex;
    user-select: none;
  
    .pane {
      &-left {
        background: orangered;
      }
      
      &-right {
        background: purple;
      }
  
      &-seekbar {
        background: blue;
        flex: none;  // 不让拖动条收缩
      }
    }
  }
</style>
