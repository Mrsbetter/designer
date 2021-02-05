<template>
  <div class="map">
    <!-- 中国地图 -->
    <div :ref="detail.identifier" class="view-chart-map">
      Click to bind data.
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import BaseView from '../View'
import ChartMapOptionZero from './data/chartMapOption'
import chartMapOptionOne from './data/chartMapOptionOne'
import { jsonParse } from './../../libs/common'
export default {
  name: 'ViewChartMap',
  extends: BaseView,
  data() {
    return {
      echart: null,
      chartMapOption: ChartMapOptionZero,
      mapData: [
        {
          name: '黑龙江',
          value: 1000
        },
        {
          name: '内蒙古',
          value: 100
        },
        {
          name: '吉林',
          value: 0
        },
        {
          name: '辽宁',
          value: 50
        },
        {
          name: '河北',
          value: 0
        },
        {
          name: '天津',
          value: 0
        },
        {
          name: '山西',
          value: 0
        },
        {
          name: '陕西',
          value: 0
        },
        {
          name: '甘肃',
          value: 0
        },
        {
          name: '宁夏',
          value: 0
        },
        {
          name: '青海',
          value: 0
        },
        {
          name: '新疆',
          value: 0
        },
        {
          name: '西藏',
          value: 0
        },
        {
          name: '四川',
          value: 0
        },
        {
          name: '重庆',
          value: 0
        },
        {
          name: '山东',
          value: 0
        },
        {
          name: '河南',
          value: 0
        },
        {
          name: '江苏',
          value: 0
        },
        {
          name: '安徽',
          value: 0
        },
        {
          name: '湖北',
          value: 0
        },
        {
          name: '浙江',
          value: 0
        },
        {
          name: '福建',
          value: 0
        },
        {
          name: '江西',
          value: 0
        },
        {
          name: '湖南',
          value: 0
        },
        {
          name: '贵州',
          value: 0
        },
        {
          name: '广西',
          value: 0
        },
        {
          name: '海南',
          value: 0
        },
        {
          name: '上海',
          value: 1
        }
      ],
      chinaGeoCoordMap: {
        深圳: [114.0645, 22.5484],
        黑龙江: [127.9688, 45.368],
        内蒙古: [110.3467, 41.4899],
        吉林: [125.8154, 44.2584],
        北京市: [116.4551, 40.2539],
        辽宁: [123.1238, 42.1216],
        河北: [114.4995, 38.1006],
        天津: [117.4219, 39.4189],
        山西: [112.3352, 37.9413],
        陕西: [109.1162, 34.2004],
        甘肃: [103.5901, 36.3043],
        宁夏: [106.3586, 38.1775],
        青海: [101.4038, 36.8207],
        新疆: [87.9236, 43.5883],
        西藏: [91.11, 29.97],
        四川: [103.9526, 30.7617],
        重庆: [108.384366, 30.439702],
        山东: [117.1582, 36.8701],
        河南: [113.4668, 34.6234],
        江苏: [118.8062, 31.9208],
        安徽: [117.29, 32.0581],
        湖北: [114.3896, 30.6628],
        浙江: [119.5313, 29.8773],
        福建: [119.4543, 25.9222],
        江西: [116.0046, 28.6633],
        湖南: [113.0823, 28.2568],
        贵州: [106.6992, 26.7682],
        云南: [102.9199, 25.4663],
        广东: [113.12244, 23.009505],
        广西: [108.479, 23.1152],
        海南: [110.3893, 19.8516],
        上海: [121.4648, 31.2891]
      }
    }
  },
  watch: {
    detail: {
      deep: true,
      immediate: true,
      handler(value) {
        if (!value) {
          return
        } else {
          const detailTemp = value.detail || {}
          if (!detailTemp.dataList) {
            if (this.detail.category === 'one') {
              this.buildDataOne(this.mapData, {}, '')
            } else {
              this.buildData(this.mapData, this.chinaGeoCoordMap, '')
            }
          } else {
            detailTemp.dataset_json = jsonParse(detailTemp.dataset_json || {})
            let datasetTemp = detailTemp.dataset_json
            if (detailTemp.dataType === 'datastatic') {
              datasetTemp = detailTemp.dataTypeList['datastatic'].dataList
            }
            if (datasetTemp.dsx && datasetTemp.dsy && datasetTemp.dsx.length === 2 && datasetTemp.dsy.length >= 2) {
              console.log(value, 'chart-map')
              this.onSetData(value)
            }
          }
        }
      }
    }
  },
  methods: {
    setOption(option) {
      if (this.echart) {
        this.echart.dispose()
      }
      const view = this.$refs[this.detail.identifier]
      if (view) {
        this.echart = echarts.init(view)
        this.echart.setOption(option)
      }
    },
    onResize() {
      // if (this.detail && this.detail.identifier && this.$refs[this.detail.identifier]) {
      //   this.$refs[this.detail.identifier].resize()
      // }
      if (this.echart) {
        this.echart.resize()
      }
    },
    onSetData(value) {
      const detailTemp = value.detail || {}
      const dataTemp = detailTemp.dataList || []
      console.log(dataTemp, '3434')
      let dsxy = detailTemp.dataset_json || {}
      if (detailTemp.dataType === 'datastatic') {
        dsxy = detailTemp.dataTypeList['datastatic'].dataList
      }
      const nameValue = dsxy.dsx || []
      const name = nameValue[0] || ''
      const valueTemp = nameValue[1] || ''
      const lnglat = dsxy.dsy || []
      const latitude = lnglat[0] || ''
      const longitude = lnglat[1] || ''
      const centerCity = lnglat[2] || ''
      this.mapData = []
      const chinaGeoCoordMap = {}
      dataTemp.forEach(arr => {
        this.mapData.push({
          name: arr[name],
          value: arr[valueTemp]
        })
        chinaGeoCoordMap[arr[name]] = [arr[latitude], arr[longitude]]
      })
      // this.buildMap(this.mapData)
      if (this.detail.category === 'one') {
        this.buildDataOne(this.mapData, chinaGeoCoordMap, centerCity)
      } else {
        this.buildData(this.mapData, chinaGeoCoordMap, centerCity)
      }
    },
    buildDataOne(res, chinaGeoCoordMap, centerCity) {
      let centerCityValue = 0
      const chinaDatas = res
      const series = []
      const convertData = []
      // const mapTypeData = chinaDatas
      chinaDatas.forEach(item => {
        if (item.name === centerCity) {
          centerCityValue = item.value
        }
        const fromCoord = chinaGeoCoordMap[item.name]
        const toCoord = chinaGeoCoordMap[centerCity]
        if (fromCoord && toCoord) {
          convertData.push([
            {
              coord: fromCoord,
              value: item.value,
              visualMap: false
            },
            {
              coord: toCoord
            }
          ])
        }
      })
      let certerTemp = []
      if (chinaGeoCoordMap[centerCity]) {
        certerTemp = chinaGeoCoordMap[centerCity].concat([centerCityValue])
      }
      series.push(
        {
          type: 'effectScatter',
          coordinateSystem: 'bmap',
          zlevel: 2,
          rippleEffect: {
            period: 4,
            brushType: 'stroke',
            scale: 4
          },
          label: {
            normal: {
              show: true,
              position: 'right',
              offset: [5, 16],
              fontSize: 12,
              color: '#f49e1d',
              formatter: '{b}'
            },
            emphasis: {
              show: true
            }
          },
          itemStyle: {
            normal: {
              show: true,
              color: '#fff',
              // color: '#f49e1d',
              opacity: 1
            },
            emphasis: {
              show: true,
              color: '#f49e1d'
            }
          },
          symbol: 'circle',
          // symbolSize: 38,
          // progressive: 1e6,
          symbolSize: function(val) {
            var tempVal = val[1]
            if (tempVal < 10) {
              return tempVal * 2 // 圆环大小
            } else {
              // eslint-disable-next-line no-unused-expressions
              return tempVal / 2
            }
          },
          zoomScale: 0.002,
          blendMode: 'lighter',
          large: true,
          largeThreshold: 500,
          // postEffect: {
          //   enable: true
          // },
          // silent: true,
          dimensions: ['lng', 'lat'],
          data: chinaDatas.map(function(dataItem) {
            var temp = chinaGeoCoordMap[dataItem.name] || []
            return {
              name: dataItem.name,
              value: temp.concat([dataItem.value]),
              visualMap: true
            }
          }),
          tooltip: {
            formatter: function(params, ticket, callback) {
              // 根据业务自己拓展要显示的内容
              var res = ''
              var name = params.name
              var value = params.value[2]
              // var value1 = params.value[3]
              res =
                "<span style='color:#fff;'>" +
                name +
                '</span><br/>数据: ' +
                value
              return res
            }
          }
        },
        // 被攻击点
        {
          type: 'scatter',
          coordinateSystem: 'bmap',
          zlevel: 2,
          rippleEffect: {
            period: 4,
            brushType: 'stroke',
            scale: 4
          },
          label: {
            normal: {
              show: true,
              position: 'right',
              offset: [5, 16],
              color: '#f49e1d',
              formatter: '{b}'
            },
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              show: true,
              color: '#f49e1d',
              // color: '#d80032',
              opacity: 1
            },
            emphasis: {
              show: false,
              color: '#f49e1d'
            }
          },
          symbol: 'pin',
          symbolSize: 38,
          data: [
            {
              name: centerCity,
              value: certerTemp,
              visualMap: false
            }
          ],
          tooltip: {
            formatter: function(params, ticket, callback) {
              // 根据业务自己拓展要显示的内容
              var res = ''
              var name = params.name
              var value = params.value[params.seriesIndex - 1]
              res =
                "<span style='color:#fff;'>" +
                name +
                '</span><br/>数据：' +
                value
              return res
            }
          }
        }
      )
      this.chartMapOption = chartMapOptionOne
      this.chartMapOption.series = series
      this.setOption(this.chartMapOption)
      console.log(this.chartMapOption)
    },
    buildData(res, chinaGeoCoordMap, centerCity) {
      let centerCityValue = 0
      const chinaDatas = res
      const series = []
      const convertData = []
      const mapTypeData = chinaDatas
      chinaDatas.forEach(item => {
        if (item.name === centerCity) {
          centerCityValue = item.value
        }
        const fromCoord = chinaGeoCoordMap[item.name]
        const toCoord = chinaGeoCoordMap[centerCity] || []
        if (fromCoord && toCoord) {
          convertData.push([
            {
              coord: fromCoord,
              value: item.value,
              visualMap: false
            },
            {
              coord: toCoord
            }
          ])
        }
      })
      let certerTemp = []
      if (chinaGeoCoordMap[centerCity]) {
        certerTemp = chinaGeoCoordMap[centerCity].concat([centerCityValue])
      }
      series.push(
        {
          type: 'map',
          map: 'china',
          geoIndex: 0,
          zlevel: 1,
          aspectScale: 0.75, // 长宽比
          showLegendSymbol: false, // 存在legend时显示
          label: {
            normal: {
              show: true
            },
            emphasis: {
              show: false,
              textStyle: {
                color: '#fff'
              }
            }
          },
          roam: true,
          itemStyle: {
            normal: {
              areaColor: '#031525',
              borderColor: '#3B5077'
            },
            emphasis: {
              areaColor: '#2B91B7'
            }
          },
          animation: false,
          data: mapTypeData,
          tooltip: {
            formatter: function(params, ticket, callback) {
              // 根据业务自己拓展要显示的内容
              var res = ''
              var name = params.name
              var value = params.value
              res =
                "<span style='color:#fff;'>" +
                name +
                '</span><br/>数据：' +
                value
              return res
            }
          }
        },
        {
          type: 'lines',
          zlevel: 2,
          effect: {
            show: true,
            color: '#3fafe7',
            period: 4, // 箭头指向速度，值越小速度越快
            trailLength: 0.02, // 特效尾迹长度[0,1]值越大，尾迹越长重
            symbol: 'arrow', // 箭头图标
            symbolSize: 5 // 图标大小
          },
          lineStyle: {
            normal: {
              color: 'rgba(55, 176, 252, 1)',
              width: 1, // 尾迹线条宽度
              opacity: 1, // 尾迹线条透明度
              curveness: 0.3 // 尾迹线条曲直度
            },
            emphasis: {
              show: false
            }
          },
          data: convertData,
          tooltip: {
            show: false
          }
        },
        {
          type: 'effectScatter',
          coordinateSystem: 'geo',
          zlevel: 2,
          rippleEffect: {
            // 涟漪特效
            period: 2, // 动画时间，值越小速度越快
            brushType: 'stroke', // 波纹绘制方式 stroke, fill
            scale: 4 // 波纹圆环最大限制，值越大波纹越大
          },
          label: {
            normal: {
              show: true,
              position: 'right', // 显示位置
              offset: [5, 0], // 偏移设置
              color: 'rgba(255, 255, 255, 0.8)',
              formatter: function(params) {
                // 圆环显示文字
                if (params.data.name === centerCity) {
                  return ''
                }
                return params.data.name
              },
              fontSize: 13
            },
            emphasis: {
              show: true
            }
          },
          symbol: 'circle',
          // symbolSize: function(val) {
          //   return 5+ val[2] * 5; //圆环大小
          // },
          itemStyle: {
            normal: {
              show: true,
              color: 'rgba(173, 222, 255, 0.2)'
            }
          },
          data: chinaDatas.map(function(dataItem) {
            return {
              name: dataItem.name,
              value: chinaGeoCoordMap[dataItem.name].concat([dataItem.value]),
              visualMap: false
            }
          }),
          tooltip: {
            formatter: function(params, ticket, callback) {
              // 根据业务自己拓展要显示的内容
              var res = ''
              var name = params.name
              var value = params.value[params.seriesIndex]
              res =
                "<span style='color:#fff;'>" +
                name +
                '</span><br/>数据：' +
                value
              return res
            }
          }
        },
        // 被攻击点
        {
          type: 'scatter',
          coordinateSystem: 'geo',
          zlevel: 2,
          rippleEffect: {
            period: 4,
            brushType: 'stroke',
            scale: 4
          },
          label: {
            normal: {
              show: true,
              position: 'right',
              offset: [5, 16],
              color: '#f49e1d',
              formatter: '{b}'
            },
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              show: true,
              color: '#f49e1d',
              opacity: 1
            },
            emphasis: {
              show: false,
              color: '#f49e1d'
            }
          },
          symbol: 'pin',
          symbolSize: 38,
          data: [
            {
              name: centerCity,
              value: certerTemp,
              visualMap: false
            }
          ],
          tooltip: {
            formatter: function(params, ticket, callback) {
              // 根据业务自己拓展要显示的内容
              var res = ''
              var name = params.name
              var value = params.value[params.seriesIndex - 1]
              res =
                "<span style='color:#fff;'>" +
                name +
                '</span><br/>数据：' +
                value
              return res
            }
          }
        }
      )
      this.chartMapOption = ChartMapOptionZero
      this.chartMapOption.series = series
      this.setOption(this.chartMapOption)
      console.log(this.chartMapOption)
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.map, .view-chart-map {
  font-size: 16px;
  height: 100%;
  width: 100%;
  /* background-image: url(../assets/bg.png); */
}
#app .echarts {
  width: 100%;
  height: 100%;
}
/* .map .echarts > div:first-of-type {
  width: 100% !important;
  height: 100% !important;
} */
.map .echarts > div canvas {
  width: 100% !important;
  height: 100% !important;
}
.chart_content {
  width: 100%;
  height: 50%;
}
</style>
