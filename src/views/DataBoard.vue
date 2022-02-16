<template>
  <div id="data-board">
    <full-screen-container>
      <board-header>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </board-header>
      <div class="main-content">
        <transition name="slide-fade" mode="out-in">
          <div v-if="value === 1" key="chart">
            图表
          </div>
          <div v-else key="map">
            地图
          </div>
        </transition>
      </div>
    </full-screen-container>
  </div>
</template>

<script>
import FullScreenContainer from '@/components/FullScreenContainer'
import BoardHeader from '@/components/BoardHeader'

export default {
  name: 'DataBoard',
  components: {
    FullScreenContainer,
    BoardHeader
  },
  data () {
    return {
      value: 1,
      options: [
        { value: 1, label: '图表' },
        { value: 2, label: '地图' }
      ]
    }
  }
}
</script>

<style lang="scss">
  #data-board {
    height: 100%;

    .el-select {
      width: 100px;
    }

    .slide-fade-enter-active {
      transition: all .3s ease;
    }
    .slide-fade-leave-active {
      transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to {
      transform: translateX(10px);
      opacity: 0;
    }

    .main-content {
      height: 100%;
      background: #F6F7FA;
    }



  }
</style>
