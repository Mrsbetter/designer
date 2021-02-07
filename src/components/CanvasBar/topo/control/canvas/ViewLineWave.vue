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
  name: 'ViewLineWave',
  extends: canvasView,
  mounted() {
    this.onResize()
  },
  methods: {
    drawLine(ctx, width, height, lineWidth, color) {
      let styleTemp = this.detail.style || {}
      if (styleTemp.baseLineStyle) {
        styleTemp = styleTemp.baseLineStyle
      } else if (styleTemp.shapeStyle) {
        styleTemp = styleTemp.shapeStyle
      }
      const len = Math.sqrt(width * width + height * height)
      // 起点
      this.ctx.beginPath()
      if (styleTemp.lineStyle === 'dashed') {
        this.ctx.setLineDash([(2 * lineWidth)])
      } else if (styleTemp.lineStyle === 'dotted') {
        this.ctx.setLineDash([lineWidth, lineWidth])
      } else {
        this.ctx.setLineDash([0])
      }
      let x = 0
      let y = 0
      const amplitude = 5
      // 振幅
      const frequency = 5
      // 频率
      while (x < len) {
        y = amplitude * Math.sin(x / frequency)
        this.ctx.lineTo(x, y)
        x = x + 1
      }
      ctx.stroke()
    },
    onResize() {
      var w = this.detail.style.position.w
      var h = this.detail.style.position.h
      var el = this.$refs.elCanvas
      var ctx = el.getContext('2d')
      ctx.clearRect(0, 0, w, h)
      // var color = this.getForeColor()
      let styleTemp = this.detail.style || {}
      if (styleTemp.baseLineStyle) {
        styleTemp = styleTemp.baseLineStyle
      } else if (styleTemp.shapeStyle) {
        styleTemp = styleTemp.shapeStyle
      }
      var lineWidth = styleTemp.lineWidth
      if (lineWidth === undefined || typeof lineWidth !== 'number') {
        lineWidth = 2
      }
      const lineColor = styleTemp.lineColor
      this.drawLine(ctx, w, h, lineWidth, lineColor)
    }
  }
}
</script>
