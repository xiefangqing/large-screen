<template>
  <div id="full-screen-container" ref="scaleBox">
    <slot/>
  </div>
</template>

<script>
import { debounce } from '@/utils'

export default {
  name: 'FullScreenContainer',
  created () {
    this.bindResizeCallback()
  },
  mounted () {
    this.setAppScale()
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.debounceInitWH)
  },
  methods: {
    bindResizeCallback () {
      this.debounceInitWH = debounce(100, this.setAppScale)
      window.addEventListener('resize', this.debounceInitWH)
    },
    setAppScale () {
      const dom = this.$refs.scaleBox
      const { width, height } = window.screen
      const currentWidth = document.documentElement.clientWidth
      dom.style.width = `${width}px`
      dom.style.height = `${height}px`
      dom.style.transform = `scale(${currentWidth / width})`
    }
  }
}
</script>

<style>
  #full-screen-container {
    position: fixed;
    top: 0;
    left: 0;
    overflow: hidden;
    transform-origin: left top;
    z-index: 999;
  }
</style>
