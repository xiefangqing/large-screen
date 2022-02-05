<template>
  <div id="board-header">
    <div class="header-left">{{ title }}</div>
    <div class="header-center">
      <slot name="center"/>
    </div>
    <div class="header-right">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BoardHeader',
  props: {
    title: {
      type: String,
      default: '数据看板'
    }
  }
}
</script>

<style lang="scss">
  #board-header {
    height: 60px;
    border-bottom: 2px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    .header-left {
      font-size: 30px;
      font-weight: bold;
    }
  }
</style>
