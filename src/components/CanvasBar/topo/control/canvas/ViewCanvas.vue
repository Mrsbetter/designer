<!--
 * @Date: 2020/09/23
 * @LastEditors: YanShen
-->
<script>
import BaseVeiw from '../View'

export default {
  name: 'ViewCanvas',
  extends: BaseVeiw,
  watch: {
    detail: {
      handler(newVal, oldVal) {
        this.onResize()
      },
      deep: true
    }
  },
  mounted() {},
  methods: {
    getForeColor() {
      var foreColor = ''
      let styleTemp = this.detail.style || {}
      if (styleTemp.baseLineStyle) {
        styleTemp = styleTemp.baseLineStyle
        foreColor = styleTemp.lineColor
      } else if (styleTemp.shapeStyle) {
        styleTemp = styleTemp.shapeStyle
        foreColor = styleTemp.shapeBg
      }
      if (foreColor === undefined || foreColor === '') {
        return 'rgba(17, 205, 239, 1)'
      } else if (foreColor.startsWith('#')) {
        return this.hex2rgba(foreColor)
      } else {
        return foreColor
      }
    },
    hex2rgba(hex) {
      // 颜色转换
      // hex格式如#ffffff
      const colorArr = []
      for (let i = 1; i < 7; i += 2) {
        colorArr.push(parseInt('0x' + hex.slice(i, i + 2))) // 16进制值转10进制
      }
      var alpha = parseInt('0x' + hex.slice(7, 9)) / 255 // 16进制值转10进制
      return `rgba(${colorArr.join(',')},${alpha})`
    },
    inRange(x, y, points) {
      // 边界检测-只能检测凸边形（检测点在不在多边形里面）
      // points表示多边形的顶点集合
      let inside = false
      for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
        const xi = points[i][0]
        const yi = points[i][1]
        const xj = points[j][0]
        const yj = points[j][1]
        const intersect =
          yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi
        if (intersect) inside = !inside
      }
      return inside
    }
  }
}
</script>
