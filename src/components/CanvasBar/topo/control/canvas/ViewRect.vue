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
import simpleEventBus from './../../libs/simpleEventBus'

export default {
  name: 'ViewRect',
  extends: canvasView,
  mounted() {
    this.onResize()

    if (this.editMode === false) {
      var _this = this
      var i = 0
      simpleEventBus.on('first-event', function(msg) {
        if (msg % 2) {
          _this.detail.style.foreColor = 'blue'
        } else {
          _this.detail.style.foreColor = 'red'
        }
        _this.onResize()
      })
      // 这里模拟服务器发送消息
      setInterval(() => {
        simpleEventBus.emit('first-event', i)
        i++
      }, 500)
    }
  },
  methods: {
    drawRect(x, y, width, height, radius, color, type) {
      var el = this.$refs.elCanvas
      if (!el) {
        return
      }
      var ctx = el.getContext('2d')
      ctx.beginPath()
      ctx.moveTo(x, y + radius)
      ctx.lineTo(x, y + height - radius)
      ctx.quadraticCurveTo(x, y + height, x + radius, y + height)
      ctx.lineTo(x + width - radius, y + height)
      ctx.quadraticCurveTo(
        x + width,
        y + height,
        x + width,
        y + height - radius
      )
      ctx.lineTo(x + width, y + radius)
      ctx.quadraticCurveTo(x + width, y, x + width - radius, y)
      ctx.lineTo(x + radius, y)
      ctx.quadraticCurveTo(x, y, x, y + radius)
      const styleTemp = this.detail.style.shapeStyle || {}
      ctx.lineWidth = styleTemp.shapeBorderWidth
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
      if (el) {
        var ctx = el.getContext('2d')
        ctx.clearRect(0, 0, w, h)
      }
      var radius = this.detail.style.radius ? this.detail.style.radius : 0
      var color = this.getForeColor()
      const tempw = Math.floor(w / 2)
      const temph = Math.floor(h / 2)
      const tempr = Math.floor(Math.max(temph, tempw) / 1.3)
      const styleTemp = this.detail.style.shapeStyle || {}
      var radialGradient1 = ctx.createRadialGradient(tempw, temph, tempr, tempw, temph, Math.floor(h))
      radialGradient1.addColorStop(0, color)
      radialGradient1.addColorStop(0.1, color)
      radialGradient1.addColorStop(1, styleTemp.shapeBorderColor)
      // this.drawRect(4, 4, w - 8, h - 8, radius, color, 'fill')
      this.drawRect(4, 4, w - 8, h - 8, radius, radialGradient1, 'fill')
    }
  }
}
</script>
