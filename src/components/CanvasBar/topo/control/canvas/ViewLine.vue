<!--
 * @Date: 2020/09/23
 * @LastEditors: YanShen
-->
<template>
  <canvas
    ref="elCanvas"
    :width="detail.style.position.w"
    :height="detail.style.position.h"
  >
    Your browser does not support the HTML5 canvas tag.
  </canvas>
</template>

<script>
import canvasView from './ViewCanvas'

export default {
  name: 'ViewLine',
  extends: canvasView,
  mounted() {
    this.onResize()
  },
  methods: {
    drawLine(x1, y1, x2, y2, lineWidth, color) {
      var el = this.$refs.elCanvas
      var ctx = el.getContext('2d')
      ctx.beginPath()
      const styleTemp = this.detail.style.baseLineStyle || {}
      if (styleTemp.lineStyle === 'dashed') {
        ctx.setLineDash([(2 * lineWidth)])
      } else if (styleTemp.lineStyle === 'dotted') {
        ctx.setLineDash([lineWidth, lineWidth])
      } else {
        ctx.setLineDash([0])
      }
      ctx.moveTo(x1, y1) // 设置起点状态
      ctx.lineTo(x2, y2) // 设置末端状态
      ctx.lineWidth = lineWidth // 设置线宽状态
      ctx.strokeStyle = color // 设置线的颜色状态
      ctx.stroke() // 进行绘制
      ctx.closePath()
    },
    onResize() {
      var w = this.detail.style.position.w
      var h = this.detail.style.position.h
      var el = this.$refs.elCanvas
      var ctx = el.getContext('2d')
      ctx.clearRect(0, 0, w, h)
      var x1 = 0
      var y1 = h / 2
      var x2 = w
      var y2 = h / 2
      var color = this.getForeColor()
      const styleTemp = this.detail.style.baseLineStyle || {}
      var lineWidth = styleTemp.lineWidth
      if (lineWidth === undefined || typeof lineWidth !== 'number') {
        lineWidth = 2
      }
      this.drawLine(x1, y1, x2, y2, lineWidth, color)
    }
  }
}
</script>
