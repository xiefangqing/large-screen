<template>
  <div id="data-board">
    <FullScreenContainer>
      <Header title="展示大屏" title-class="f30" :option-list.sync="optionList" @selected="option = $event">
        <template #center>
          <span>{{ time }}</span>
          <span>{{ week }}</span>
        </template>
      </Header>
      <div class="main-content">
        <transition name="slide-fade" mode="out-in">
          
          <div v-if="option === 'chart'" key="chart" class="chart">
            <!--<div class="box">-->
            <!--  <Header title="Highcharts" :option-list.sync="HCList" @selected="HCType = $event"></Header>-->
            <!--  <div ref="HCContainer" class="container"></div>-->
            <!--</div>-->
            <!--<div class="box">-->
            <!--  <Header title="ECharts" :option-list.sync="ECList" @selected="ECType = $event"></Header>-->
            <!--  <div ref="ECContainer" class="container"></div>-->
            <!--</div>-->
            <div class="box">
              <SplitPane v-model="offset"/>
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
import SplitPane from '@/components/SplitPane'
import { getFormatTime } from '@/utils'

import Highcharts from 'highcharts'
import Highcharts3D from 'highcharts/highcharts-3d'
Highcharts3D(Highcharts)

export default {
  name: 'DataBoard',
  components: {
    FullScreenContainer,
    Header,
    SplitPane
  },
  data () {
    return {
      time: getFormatTime(),
      week: getFormatTime(true),
      
      optionList: [
        { text: '图表', value: 'chart' },
        { text: '地图', value: 'map' }
      ],
      HCList: [
        { text: '3D 饼图', value: '3dpie' },
        { text: '环形图', value: 'doughnut' }
      ],
      ECList: [],
      option: '',
      HCType: '',
      ECType: '',
      
      offset: 0.8,
      
      chart: null,
      type: '3dpie',
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
      padding: 8px 0;
      
      .chart {
        display: flex;
        justify-content: center;
        gap: 4px;
        
        .box {
          width: 48%;
          height: 400px;
          border: 1px solid #ccc;
          overflow: hidden;
  
          background: cornflowerblue;
  
          .header {
            border: 0;
          }
        }
      }



    }
  }
</style>
