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
  name: 'ViewCircular',
  extends: canvasView,
  mounted() {
    this.onResize()
  },
  methods: {
    drawCircular(x, y, r, start, end, color, type) {
      var el = this.$refs.elCanvas
      var ctx = el.getContext('2d')
      var unit = Math.PI / 180
      ctx.beginPath()
      ctx.arc(x, y, r, start * unit, end * unit)
      // ctx.arc(100, 100, 100, 0, 2 * Math.PI);
      const styleTemp = this.detail.style.shapeStyle || {}
      ctx.lineWidth = styleTemp.shapeBorderWidth
      // ctx.shadowBlur = 2
      // ctx.shadowColor = styleTemp.shapeBorderColor
      // ctx.shadowOffsetX = 0
      // ctx.shadowOffsetY = 0
      ctx.closePath()
      ctx.strokeStyle = styleTemp.shapeBorderColor
      ctx.stroke()
      ctx[type + 'Style'] = color
      ctx[type]()
    },
    onResize() {
      var w = this.detail.style.position.w
      var h = this.detail.style.position.h
      var el = this.$refs.elCanvas
      var ctx = el.getContext('2d')
      ctx.clearRect(0, 0, w, h)
      var x = w / 2
      var y = h / 2
      var r = w / 2 > h / 2 ? h / 2 : w / 2
      var color = this.getForeColor()
      const temp = Math.floor(r)
      const styleTemp = this.detail.style.shapeStyle || {}
      var radialGradient1 = ctx.createRadialGradient(temp, temp, temp, temp, temp, 0)
      radialGradient1.addColorStop(0, styleTemp.shapeBorderColor)
      radialGradient1.addColorStop(0.1, color)
      radialGradient1.addColorStop(1, color)
      // this.drawCircular(0, 0, 0, 0, 360, color, 'fill');
      this.drawCircular(x, y, r - 2, 0, 360, radialGradient1, 'fill')
    }
  }
}
</script>
