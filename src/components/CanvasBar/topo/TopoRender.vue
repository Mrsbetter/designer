<template>
  <div id="topo-render" :style="{transform: `scale(${scaleNum})`, transformOrigin: `0 0`}">
    <div v-if="configData.layer" class="topo-render" :style="layerStyle">
      <template v-for="(component, index) in configData.components">
        <div
          v-show="component.style.visible == undefined ? true : component.style.visible"
          :key="index"
          class="topo-render-wrapper"
          :class="{'topo-render-wrapper-clickable': component.action.length > 0}"
          :style="{
            left: component.style.position.x + 'px',
            top: component.style.position.y + 'px',
            width: component.style.position.w + 'px',
            height: component.style.position.h + 'px',
            backgroundColor: component.style.backColor,
            zIndex: component.style.zIndex,
            borderWidth: component.style.borderWidth + 'px',
            borderStyle: component.style.borderStyle,
            borderColor: component.style.borderColor,
            transform: component.style.transform ? `rotate(${component.style.transform}deg)` : 'rotate(0deg)'
          }"
          @click="doClickComponent(component)"
          @dblclick="doDbClickComponent(component)"
        >
          <component
            :is="parseView(component)"
            ref="spirit"
            :detail="component"
            @search="onSetSearch"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import TopoBase from './TopoBase'

import topoUtil from './util/topo-util'

export default {
  name: 'TopoRender',
  components: {},
  extends: TopoBase,
  props: {
    list: {
      required: false,
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      configData: {},
      scaleNum: 1
    }
  },
  computed: {
    layerStyle: function() {
      const styles = []
      if (this.configData.layer.backColor) {
        if (this.configData.layer.backColor.startsWith('#') || this.configData.layer.backColor.startsWith('rgb')) {
          styles.push(`background-color: ${this.configData.layer.backColor}`)
        } else {
          styles.push(`background: ${this.configData.layer.backColor}`)
        }
      }
      if (this.configData.layer.backgroundImage) {
        styles.push(
          `background-image: url("${this.configData.layer.backgroundImage}")`
        )
      }
      if (this.configData.layer.width > 0) {
        styles.push(`width: ${this.configData.layer.width}px`)
      }
      if (this.configData.layer.height > 0) {
        styles.push(`height: ${this.configData.layer.height}px`)
      }
      const style = styles.join(';')
      return style
    }
  },
  watch: {
    'list': {
      deep: true,
      immediate: true,
      handler(value) {
        const temp = localStorage.getItem('topoData') // 判断是从编辑进入的预览还是列表
        if (!value || temp) {
          if (temp) {
            this.configData = JSON.parse(temp)
          }
          return
        }
        this.configData = value || {}
      }
    }
  },
  mounted() {
    // 这里只是纯前端项目，实际应该从后台拿取数据
    // var temp = localStorage.getItem('topoData')
    // this.configData = JSON.parse(temp)
    this.autoChange()
  },
  methods: {
    autoChange() {
      const getTemp = document.getElementById('topo-render')
      if (getTemp) {
        const dw = getTemp.offsetWidth
        const dh = getTemp.offsetHeight
        if (this.configData.layer) {
          const ws = dw / (this.configData.layer.width || 1)
          const hs = dh / (this.configData.layer.height || 1)
          setTimeout(() => {
            if (ws <= 0 && hs <= 0) {
              return
            } else {
              this.scaleNum = ws
            }
          }, 0)
        }
      }
    },
    parseView(component) {
      return topoUtil.parseViewName(component)
    },
    doClickComponent(component) {
      for (var i = 0; i < component.action.length; i++) {
        var action = component.action[i]
        if (action.type === 'click') {
          this.handleComponentActuib(action)
        }
      }
    },
    doDbClickComponent(component) {
      for (var i = 0; i < component.action.length; i++) {
        var action = component.action[i]
        if (action.type === 'dblclick') {
          this.handleComponentActuib(action)
        }
      }
    },
    handleComponentActuib(action) {
      var _this = this
      if (action.action === 'visible') {
        if (action.showItems.length > 0) {
          action.showItems.forEach(identifier => {
            _this.showComponent(identifier, true)
          })
        }
        if (action.hideItems.length > 0) {
          action.hideItems.forEach(identifier => {
            _this.showComponent(identifier, false)
          })
        }
      } else if (action.action === 'service') {
        _this.sendFun(action)
      }
    },
    showComponent(identifier, visible) {
      console.log('show:' + identifier + ',visible:' + visible)
      var spirits = this.$refs['spirit']
      for (var i = 0; i < spirits.length; i++) {
        var spirit = spirits[i]
        if (spirit.detail.identifier === identifier) {
          spirit.detail.style.visible = visible
          break
        }
      }
    },
    onSetSearch(chart) {
      this.$emit('search', chart)
    },
    onResizeWindow() {
      this.$refs['ruler-tool'].onResizeWindow()
    }
  }
}
</script>

<style lang="scss">
.topo-render {
  overflow: hidden;
  background-color: white;
  background-clip: padding-box;
  background-origin: padding-box;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;
  width: 100%;
  height: 100%;

  .topo-render-wrapper {
    position: absolute;
  }

  .topo-render-wrapper-clickable {
    cursor: pointer;
  }
}
</style>
