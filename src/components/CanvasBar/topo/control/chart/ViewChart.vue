<template>
  <div class="view-chart">
    <div
      v-show="detailList.chartText!=='数据加载完毕'"
      class="no-chart"
    >
      <!-- <img v-if="detailList.templated_type==='Line'" src="../../../../assets/img/line_no.png">
      <img v-else-if="detailList.templated_type==='Bar'" src="../../../../assets/img/bar_no.png">
      <img v-else-if="detailList.templated_type==='Pie'" src="../../../../assets/img/pie_no.png">
      <img v-else-if="detailList.templated_type==='Combinatory'" src="../../../../assets/img/combinatory_no.png"> -->
      <div>{{ detailList.chartText || '没有数据' }}</div>
    </div>
    <div ref="chartView" class="show-chart">Click to bind data.</div>
  </div>
</template>

<script>
import echarts from 'echarts'
import BaseView from '../View'

export default {
  name: 'ViewChart',
  extends: BaseView,
  props: {},
  data() {
    return {
      echart: null,
      dataStepLine: [100, 0, 100, 100, 0, 0, 100],
      dataLine: [820, 932, 901, 934, 1290, 1330, 1320],
      option: {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          silent: true
        },
        yAxis: {
          type: 'value',
          silent: true
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            clickable: false,
            type: 'line',
            smooth: true
          }
        ]
      },
      detailList: {}
    }
  },
  watch: {
    'detail': {
      deep: true,
      immediate: true,
      handler(value) {
        if (value) {
          this.detailList = value.detail || {}
        }
        if (!value || !this.$refs.chartView) {
          return
        }
        console.log(value, 'view-chart')
        this.setChartOption(this.detailList)
      }
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.setOption(this.option)
    })
  },
  methods: {
    setChartOption(newVal) {
      if (newVal.chartText !== '数据加载完毕') {
        return
      }
      const option = JSON.parse(newVal.data_json)
      this.option = option
      console.log(option, 'view-chart-data_json')
      if (this.echart) {
        this.echart.dispose()
        const view = this.$refs.chartView
        this.echart = echarts.init(view)
        this.echart.setOption(option)
      } else {
        this.setOption(option)
      }
    },
    setOption(option) {
      if (this.echart) {
        this.echart.dispose()
      }
      if (this.detail.type === 'chart-line') {
        this.option.series[0].type = 'line'
        this.option.series[0].data = this.dataLine
        delete this.option.series[0]['step']
        this.option.series[0]['smooth'] = true
      } else if (this.detail.type === 'chart-line-step') {
        this.option.series[0].type = 'line'
        this.option.series[0].data = this.dataStepLine
        this.option.series[0].step = 'start'
        delete this.option.series[0]['smooth']
      } else if (this.detail.type === 'chart-bar') {
        this.option.series[0].type = 'bar'
        this.option.series[0].data = this.dataLine
        delete this.option.series[0]['step']
      } else if (this.detail.type === 'chart') {
        this.option = JSON.parse(this.detail.detail.data_json)
      }
      const view = this.$refs.chartView
      this.echart = echarts.init(view)
      this.echart.setOption(this.option)
    },
    onResize() {
      if (this.echart) {
        this.echart.resize()
      }
    },
    updateView() {
      this.setOption(this.option)
    }
  }
}
</script>

<style lang="scss">
.view-chart {
  height: 100%;
  width: 100%;
  color: white;
  overflow: hidden;
  .no-chart {
    width: 100%;
    height: 100%;
    text-align: center;
    padding-top: 10%;
    pointer-events: none;
    img {
      max-width: 60%;
      height: 60%;
    }
  }
  .show-chart {
    height: 100%;
    width: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
