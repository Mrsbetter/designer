import mapConfig from './map-config.json'
export default {
  tooltip: {
    trigger: 'item',
    // backgroundColor: 'rgba(166, 200, 76, 0.82)',
    // borderColor: '#FFFFCC',
    showDelay: 0,
    hideDelay: 0,
    enterable: true,
    transitionDuration: 0,
    extraCssText: 'z-index:100',
    formatter: function(params, ticket, callback) {
      // 根据业务自己拓展要显示的内容
      var res = ''
      var name = params.name
      var value = params.value[params.seriesIndex + 1]
      res =
        "<span style='color:#fff;'>" +
        name +
        '</span><br/>数据：' +
        value
      return res
    }
  },
  // backgroundColor:'#013954',
  visualMap: {
    // 图例值控制
    min: 0,
    max: 1,
    calculable: true,
    show: true,
    // color: ['#001d80', '#295bff'],
    // color: ['#f44336', '#fc9700', '#ffde00', '#ffde00', '#00eaff'],
    color: ['#FFFF00', '#FF9797'],
    // color: ['rgba(55, 176, 252, 0.5)'],
    // color: ['rgba(255, 255, 255, 0.3)'],
    textStyle: {
      color: 'rgba(255, 255, 255, 1)'
    }
  },
  bmap: { // 加载 bmap 组件
    center: [104.114129, 37.550339],
    zoom: 5, // 地图当前的缩放比例
    roam: true, // 开启鼠标缩放和平移漫游
    // scaleLimit: { min: 6, max: 12 }, // echarts设置地图最小最大缩放比例的接口不起作用，要使用百度地图的接口设置
    mapStyle: {
      styleJson: mapConfig
    }
  },
  series: []
}
