export default {
  tooltip: {
    trigger: 'item',
    // backgroundColor: "rgba(166, 200, 76, 0.82)",
    // borderColor: "#FFFFCC",
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
        "<span style='color:#fff;'>" + name + '</span><br/>数据：' + value
      return res
    }
  },
  // backgroundColor:"#013954",
  visualMap: {
    // 图例值控制
    min: 0,
    max: 1,
    calculable: true,
    show: true,
    // color: ["#f44336", "#fc9700", "#ffde00", "#ffde00", "#00eaff"],
    color: ['#001d80', '#295bff'],
    // color: ['rgba(55, 176, 252, 0.5)'],
    // color: ['rgba(255, 255, 255, 0.3)'],
    textStyle: {
      color: 'rgba(255, 255, 255, 1)'
    }
  },
  geo: {
    map: 'china',
    zoom: 1.2,
    label: {
      emphasis: {
        show: false
      }
    },
    roam: true, // 是否允许缩放
    itemStyle: {
      normal: {
        color: 'rgba(51, 69, 89, .5)', // 地图背景色
        borderColor: '#516a89', // 省市边界线00fcff 516a89
        borderWidth: 1
      },
      emphasis: {
        color: 'rgba(37, 43, 61, .5)' // 地图选中背景色
      }
    }
  },
  series: []
}
