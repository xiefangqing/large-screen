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
            <SplitPane :default-offset.sync="offset" :seekbar-width="10" :min="0.3" :max="0.7" @offset-change="debounceLoadChart">
              <template #left>
                <Header title="Highcharts" :option-list.sync="hList" @selected="hType = $event"></Header>
                <div ref="hContainer" class="container"></div>
              </template>
              <template #right>
                <Header title="ECharts" :option-list.sync="eList" @selected="eType = $event"></Header>
                <div ref="eContainer" class="container"></div>
              </template>
            </SplitPane>
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
import { getFormatTime, debounce } from '@/utils'

import * as echarts from 'echarts'
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
      hList: [
        { text: '3D 饼图', value: '3dpie' },
        { text: '环形图', value: 'doughnut' }
      ],
      eList: [
        { text: '科技圆环', value: 'ring' }
      ],
      
      option: '',
      hType: '3dpie',
      eType: 'ring',

      hChart: null,
      eChart: null,
      
      offset: 0.5
      
      
      
    }
  },
  mounted () {
    setInterval(_ => {
      this.time = getFormatTime()
    }, 1000)
    
    this.debounceLoadChart = debounce(this.loadChart, 500)
    this.loadChart()
  },
  methods: {
    initEChart () {
      // 如果图表实例已经存在，就销毁
      if (this.eChart) this.eChart.dispose()
      // 初始化实例
      this.eChart = echarts.init(this.$refs.eContainer)
      const options = this.getOptions(this.eType)
      this.eChart.setOption(options)
    },
    initHChart () {
      if (this.hChart) this.hChart.destroy()
      const options = this.getOptions(this.hType)
      // 改角度是为了让标签显示完整
      // if (this.yes > 28) {
      //   hOptions.plotOptions.pie.startAngle = 10
      // } else {
      //   hOptions.plotOptions.pie.startAngle = 65
      // }
      this.hChart = Highcharts.chart(this.$refs.hContainer, options)
      
    },
    loadChart () {
      const { initEChart, initHChart, $nextTick } = this
      $nextTick(_ => {
        initEChart()
        initHChart()
      })
    },
    getOptions (type) {
      if (type === '3dpie') {
        return {
          

          chart: {
            spacing: [0, 0, 0, 0],
            backgroundColor: 'transparent',
            options3d: {
              enabled: true,
              alpha: 50
            }
          },
          credits: { enabled: false },
          title: { text: '' },
          tooltip: { enabled: false },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              depth: 20,
              dataLabels: {
                enabled: true,
                style: {
                  color: '#424242',
                  fontSize: '14px',
                  textOutline: 'none'
                },
                distance: 10,
                softConnector: false,
                connectorPadding: 0,
                formatter () {
                  return `${this.point.name}<br/>观测设施<br/><span style="font-size: 22px;font-weight: normal;color: ${this.point.c};">${this.point.y}<span style="font-size: 14px;">%</span></span>`
                }
              },
              states: {
                hover: {
                  // enabled: false
                }
              },
              slicedOffset: 20 // 突出间距
            }
          },
          series: [{
            type: 'pie',
            // size: '80%',
            // center: ['50%', '30%'],
            events: {
              click: function (params) {
                // let cData = params.point.options
                // _this.mc.addExtraPoints({
                //   uuid: UUID1,
                //   color: params.point.c.to || '#FFCF00',
                //   text: cData.name.split('<br>')[0],
                //   params: {
                //     elementType: 31,
                //     safety: cData.filterKey,
                //     type: 1,
                //     vals: '8888'
                //   }
                // })
                console.log('点击图表')
              }
            },
            data: [
              { name: '水库有变形', y: 30, c: 'red', filterKey: 1 },
              { name: '水库无变形', y: 70, c: 'blue', filterKey: 2 }]
          }]
          
          
          
          
        }
      } else if (type === 'doughnut') {
        
        
        
      } else if (type === 'ring') {
        return {
          
          
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: [150, 230, 224, 218, 135, 147, 260],
              type: 'line'
            }
          ]
          
          
        }
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
      padding: 8px 0;
      height: calc(100% - 77px);
      overflow: auto;
      
      .chart {
        margin: auto;
        width: 98%;
        height: 400px;
        border: 1px solid #ccc;
  
        .header {
          border: 0;
        }
        
        .container {
          height: calc(400px - 60px);
        }
      }



    }
  }
</style>
