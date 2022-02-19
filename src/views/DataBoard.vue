<template>
  <div id="data-board">
    <FullScreenContainer>
      <Header title="展示大屏" :option-list="optionList" @selected="option = $event">
        <template #center>
          <span>{{ time }}</span>
          <span>{{ week }}</span>
        </template>
      </Header>
      <div class="main-content">
        <transition name="slide-fade" mode="out-in">
          <div v-if="option === 'chart'" key="chart" class="chart">
            <div class="box">
              <h3>
                Highcharts：
                <select v-model="type" @change="switchChart">
                  <option v-for="c in moreCharts" :value="c.code">{{ c.name }}</option>
                </select>
              </h3>
              <div ref="high-container" class="container"></div>
            </div>
            <div class="box">
              <h3>
                ECharts：
                <select v-model="type" @change="switchChart">
                  <option v-for="c in moreCharts" :value="c.code">{{ c.name }}</option>
                </select>
              </h3>
              <div id="container" class="container"></div>
            </div>
          </div>
          <div v-else-if="option === 'map'" key="map">
            地图
          </div>
        </transition>
      </div>
    </FullScreenContainer>
  </div>
</template>

<script>
import FullScreenContainer from '@/components/FullScreenContainer'
import Header from '@/components/Header'

import Highcharts from 'highcharts'
import Highcharts3D from 'highcharts/highcharts-3d'
Highcharts3D(Highcharts)

import { getFormatTime } from '@/utils'

export default {
  name: 'DataBoard',
  components: {
    FullScreenContainer,
    Header
  },
  data () {
    return {
      // 主选项
      optionList: [
        { text: '图表', value: 'chart' },
        { text: '地图', value: 'map' }
      ],
      // 当前显示的主内容
      option: '',
      
      chart: null,
      type: '3dpie',
      moreCharts: [
        { name: '3D 饼图', code: '3dpie' },
        { name: '环形图', code: 'doughnut' }
      ],
      
      time: getFormatTime(),
      week: getFormatTime(true)
    }
  },
  mounted () {
    // this.switchChart()
    setInterval(_ => {
      this.time = getFormatTime()
    }, 1000)
  },
  methods: {
    switchChart () {
      const options = this.getOptions(this.type)
      // 如果图表实例已经存在，就销毁
      if (this.chart) {
        this.chart.destroy()
      }
      this.chart = Highcharts.chart('container', options);
    },
    getOptions (type) {
      if (type === '3dpie') {
        return {
          // ...
        }
      } else if (type === 'doughnut') {
        
      }
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
      //height: calc(100% - 60px);
      padding: 8px;
      
      .chart {
        display: flex;
        flex-flow: wrap;
        justify-content: center;
        gap: 4px;
        
        .box {
          width: 48%;
          height: 400px;
          border: 1px solid #ccc;
          overflow: hidden;
          position: relative;
    
          h3 {
            position: absolute;
            top: -10px;
            left: 10px;
            z-index: 10;
          }
        }
      }



    }



  }
</style>
