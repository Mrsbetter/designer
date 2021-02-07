<template>
  <div class="topo-main">
    <vue-ruler-tool
      ref="ruler-tool"
      :parent="true"
      :is-scale-revise="true"
      @contextmenu.prevent="openMenu($event)"
    >
      <div
        id="surface-edit-layer"
        tabindex="0"
        class="topo-layer"
        :class="{ 'topo-layer-view-selected': selectedIsLayer }"
        :style="layerStyle"
        @click="onLayerClick($event)"
        @mouseup="onLayerMouseup($event)"
        @mousemove="onLayerMousemove($event)"
        @mousedown="onLayerMousedown($event)"
        @keyup.delete="removeItem()"
        @dragover.prevent
        @drop="onDrop"
        @keydown.ctrl.67.stop="copyItem"
        @keydown.ctrl.86.stop="pasteItem"
        @keydown.ctrl.90.stop="undo"
        @keydown.ctrl.89.stop="redo"
      >
        <template v-for="(component, index) in configData.components">
          <div
            :key="component.identifier"
            tabindex="0"
            :class="['topo-layer-view', { 'topo-layer-view-selected':
              selectedComponentMap[component.identifier] === undefined ? false : true
            }]"
            :style="{
              left: component.style.position.x + 'px',
              top: component.style.position.y + 'px',
              width: component.style.position.w + 'px',
              height: component.style.position.h + 'px',
              'background-color': component.style.backColor,
              zIndex: component.style.zIndex,
              borderWidth: component.style.borderWidth + 'px',
              borderStyle: component.style.borderStyle,
              borderColor: component.style.borderColor,
              transform: component.style.transform ? `rotate(${component.style.transform}deg)` : 'rotate(0deg)'
            }"
            @click.stop="clickComponent(index, component, $event)"
            @mousedown.stop="controlMousedown(component, $event, index)"
            @keyup.delete="removeItem(index, component)"
            @keydown.up.exact.prevent="moveItems('up')"
            @keydown.right.exact.prevent="moveItems('right')"
            @keydown.down.exact.prevent="moveItems('down')"
            @keydown.left.exact.prevent="moveItems('left')"
            @keydown.ctrl.67.stop="copyItem"
            @keydown.ctrl.86.stop="pasteItem"
            @keydown.ctrl.90.stop="undo"
            @keydown.ctrl.89.stop="redo"
          >
            <component
              :is="parseView(component)"
              :ref="'comp' + index"
              :detail="component"
              :edit-mode="true"
              :selected="selectedComponentMap[component.identifier] ? true : false"
              @edit="onSetEdit"
              @search="onSetSearch"
              @delete="onDelSearch"
            />
            <div
              v-show="selectedComponentMap[component.identifier]"
              class="resize-left-top"
              @mousedown.stop="resizeMousedown(component, $event, index, 'resize-lt')"
            />
            <div
              v-show="selectedComponentMap[component.identifier]"
              class="resize-left-center"
              @mousedown.stop="resizeMousedown(component, $event, index, 'resize-lc')"
            />
            <div
              v-show="selectedComponentMap[component.identifier]"
              class="resize-left-bottom"
              @mousedown.stop="resizeMousedown(component, $event, index, 'resize-lb')"
            />
            <div
              v-show="selectedComponentMap[component.identifier]"
              class="resize-right-top"
              @mousedown.stop="resizeMousedown(component, $event, index, 'resize-rt')"
            />
            <div
              v-show="selectedComponentMap[component.identifier]"
              class="resize-right-center"
              @mousedown.stop="resizeMousedown(component, $event, index, 'resize-rc')"
            />
            <div
              v-show="selectedComponentMap[component.identifier]"
              class="resize-right-bottom"
              @mousedown.stop="resizeMousedown(component, $event, index, 'resize-rb')"
            />
            <div
              v-show="selectedComponentMap[component.identifier]"
              class="resize-center-top"
              @mousedown.stop="resizeMousedown(component, $event, index, 'resize-ct')"
            />
            <div
              v-show="selectedComponentMap[component.identifier]"
              class="resize-center-bottom"
              @mousedown.stop="resizeMousedown(component, $event, index, 'resize-cb')"
            />
          </div>
        </template>
        <div
          class="topo-frame-selection"
          :style="{
            width: frameSelectionDiv.width + 'px',
            height: frameSelectionDiv.height + 'px',
            top: frameSelectionDiv.top + 'px',
            left: frameSelectionDiv.left + 'px'
          }"
        />
      </div>
    </vue-ruler-tool>
    <ul v-show="visible" :style="{left: left+'px',top: top+'px'}" class="contextmenu">
      <li @click="copypasteItem">复制</li>
      <li @click="upperItem">上移一层</li>
      <li @click="downItem">下移一层</li>
      <li @click="removeItem">删除</li>
    </ul>
  </div>
</template>

<script>
import VueRulerTool from './ruler'
import TopoBase from './TopoBase'

import topoUtil from './util/topo-util'
import { deepCopy } from './libs/utils'

import {
  checkByRectCollisionDetection
} from './libs/topo'
import { jsonParse } from './libs/common'
import { mapActions, mapState, mapMutations } from 'vuex'

export default {
  name: 'TopoMain',
  components: {
    VueRulerTool
  },
  extends: TopoBase,
  data() {
    return {
      moveItem: {
        startX: 0,
        startY: 0
      }, // 移动组件 相关变量
      resizeItem: {
        startPx: 0,
        startPy: 0,
        x: 0,
        y: 0,
        w: 0,
        h: 0
      }, // resize组件 相关变量
      frameSelectionDiv: {
        width: 0,
        height: 0,
        top: 10,
        left: 10,
        startX: 0,
        startY: 0,
        startPageX: 0,
        startPageY: 0
      },
      flag: '', // 当前操作标志位
      curControl: null,
      curIndex: -1,
      selectedValue: 100,
      top: 0,
      left: 0,
      selectedTag: {},
      affixTags: [],
      visible: false,
      autoScaleStatus: true
    }
  },
  computed: {
    ...mapState({
      selectedComponent: state => state.topoEditor.selectedComponent,
      selectedComponents: state => state.topoEditor.selectedComponents,
      selectedComponentMap: state => state.topoEditor.selectedComponentMap,
      configData: state => state.topoEditor.topoData,
      selectedIsLayer: state => state.topoEditor.selectedIsLayer,
      copySrcItems: state => state.topoEditor.copySrcItems,
      copyCount: state => state.topoEditor.copyCount
    }),
    layerStyle: function() {
      var scale = this.selectedValue / 100
      var styles = [`transform:scale(${scale})`]
      if (this.configData.components.length === 0) {
        this.onSetBlankSreen()
      }
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
      var style = styles.join(';')
      return style
    }
  },
  watch: {
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  updated: function() {
    if (this.autoScaleStatus) {
      this.autoChange(this.autoScaleStatus)
    }
  },
  mounted() {
    this.loadDefaultTopoData()
  },
  methods: {
    ...mapMutations('topoEditor', [
      'SET_TOPODATA',
      'setSelectedComponent',
      'addSelectedComponent',
      'removeSelectedComponent',
      'clearSelectedComponent',
      'setLayerSelected',
      'setCopySrcItems',
      'increaseCopyCount',
      'upper',
      'down',
      'execute',
      'undo',
      'redo'
    ]),
    ...mapActions('topoEditor', ['loadDefaultTopoData']),
    controlMousedown(component, event, index) {
      if (event.ctrlKey) {
        return
      }
      this.flag = 'move'
      this.curControl = component
      this.clickItem(component, index)
      this.moveItem.startX = event.pageX
      this.moveItem.startY = event.pageY
      // 记录初始信息--move
      for (var key in this.selectedComponentMap) {
        var components = this.selectedComponentMap[key]
        component.style.temp = {}
        component.style.temp.position = {}
        component.style.temp.position.x = components.style.position.x
        component.style.temp.position.y = components.style.position.y
      }
    },
    resizeMousedown(component, $event, index, flag) {
      this.closeMenu()
      // resize-鼠标按下事件
      this.flag = flag
      this.curControl = component
      this.curIndex = index
      this.clickItem(component, index)
      // var dom = event.currentTarget
      this.resizeItem.startPx = event.pageX
      this.resizeItem.startPy = event.pageY
      // 记录初始信息-resize
      this.resizeItem.x = this.curControl.style.position.x
      this.resizeItem.y = this.curControl.style.position.y
      this.resizeItem.w = this.curControl.style.position.w
      this.resizeItem.h = this.curControl.style.position.h
    },
    onLayerMousemove(event) {
      if (event.which !== 1) {
        this.flag = ''
        return
      }
      if (this.flag === '') return
      if (this.flag.startsWith('resize')) {
        let dx = event.pageX - this.resizeItem.startPx
        let dy = event.pageY - this.resizeItem.startPy
        switch (this.flag) {
          case 'resize-lt':
            this.curControl.style.position.x = this.resizeItem.x + dx
            this.curControl.style.position.y = this.resizeItem.y + dy
            dx = -dx
            dy = -dy
            break
          case 'resize-lc':
            this.curControl.style.position.x = this.resizeItem.x + dx
            dy = 0
            dx = -dx
            break
          case 'resize-lb':
            this.curControl.style.position.x = this.resizeItem.x + dx
            dx = -dx
            break
          case 'resize-rt':
            this.curControl.style.position.y = this.resizeItem.y + dy
            dy = -dy
            break
          case 'resize-rc':
            dy = 0
            break
          case 'resize-rb':
            break
          case 'resize-ct':
            this.curControl.style.position.y = this.resizeItem.y + dy
            dx = 0
            dy = -dy
            break
          case 'resize-cb':
            dx = 0
            break
        }
        if (this.resizeItem.w + dx > 20) {
          this.curControl.style.position.w = this.resizeItem.w + dx
        }
        if (this.resizeItem.h + dy > 20) {
          this.curControl.style.position.h = this.resizeItem.h + dy
        }
        // canvas组件需要重新渲染
        // DOM 还没有更新
        this.$nextTick(function() {
          // DOM 更新了
          var a = this.$refs['comp' + this.curIndex][0]
          a.onResize()
        })
      } else if (this.flag === 'move') {
        // 移动组件
        const dx = event.pageX - this.moveItem.startX
        const dy = event.pageY - this.moveItem.startY
        for (var key in this.selectedComponentMap) {
          const component = this.selectedComponentMap[key]
          component.style.position.x = component.style.temp.position.x + dx
          component.style.position.y = component.style.temp.position.y + dy
        }
      } else if (this.flag === 'frame_selection') {
        this.onFrameSelection(event)
      }
    },
    onScrollLen(value) {
      this.autoScaleStatus = false
      let selectedTemp = this.selectedValue || 100
      selectedTemp += value
      this.onChangeSiler(selectedTemp)
    },
    onScroll(event) {
      if (window.event.ctrlKey) {
        var e = event || window.event
        e.preventDefault()
        let upLength = 0
        let selectedTemp = this.selectedValue || 100
        if (e.wheelDelta) {
          // 当鼠标滚轮向上滚动时e.wheelDelta > 0
          upLength = e.wheelDelta / 100
          selectedTemp += upLength
        } else if (e.detail) {
          // 当鼠标滚轮向上滚动时e.detail < 0
          upLength = e.wheelDelta / 100
          selectedTemp -= upLength
        }
        this.onChangeSiler(selectedTemp)
      }
    },
    autoChange(val) {
      console.log(val, 'autochange', this.selectedValue)
      const getTemp = document.getElementById('content')
      if (val && getTemp) {
        const dw = getTemp.offsetWidth - 36
        const dh = getTemp.offsetHeight - 36
        const ws = dw / (this.configData.layer.width || 1)
        const hs = dh / (this.configData.layer.height || 1)
        setTimeout(() => {
          if (ws <= 0 && hs <= 0) {
            return
          } else {
            this.selectedValue = Math.min(ws, hs) * 100
          }
        }, 0)
      }
    },
    onChangeSiler(val) {
      this.autoScaleStatus = false
      setTimeout(() => {
        this.selectedValue = val
      }, 0)
    },
    onSetBlankSreen(event) {
      if (!event) {
        this.clearSelectedComponent()
        this.setLayerSelected(true)
        return
      }
      this.onFrameSelection(event)
      this.frameSelectionDiv.width = 0
      this.frameSelectionDiv.height = 0
      this.frameSelectionDiv.top = 0
      this.frameSelectionDiv.left = 0
    },
    onLayerMouseup(event) {
      this.closeMenu()
      if (this.flag.startsWith('resize')) {
        const a = this.$refs['comp' + this.curIndex][0]
        a.onResize()
      } else if (this.flag === 'frame_selection') {
        // 由于和onLayerClick冲突，这里模拟下点击空白区域
        this.onSetBlankSreen(event)
      } else if (this.flag === 'move') {
        // 鼠标move只是方便用户预览，真正执行应该用命令，所以要先恢复
        const dx = event.pageX - this.moveItem.startX
        const dy = event.pageY - this.moveItem.startY
        for (var key in this.selectedComponentMap) {
          const component = this.selectedComponentMap[key]
          component.style.position.x = component.style.position.x - dx
          component.style.position.y = component.style.position.y - dy
        }
        this.execute({
          op: 'move',
          dx: dx,
          dy: dy,
          items: this.selectedComponentMap
        })
      }
      this.flag = ''
    },
    onLayerMousedown($event) {
      this.closeMenu()
      this.flag = 'frame_selection'
      this.frameSelectionDiv.startX = event.offsetX
      this.frameSelectionDiv.startY = event.offsetY
      this.frameSelectionDiv.startPageX = event.pageX
      this.frameSelectionDiv.startPageY = event.pageY
    },
    onLayerClick() {
      this.closeMenu()
      // this.clearSelectedComponent();
      // this.setLayerSelected(true);
    },
    onFrameSelection(event) {
      const dx = event.pageX - this.frameSelectionDiv.startPageX
      const dy = event.pageY - this.frameSelectionDiv.startPageY
      this.frameSelectionDiv.width = Math.abs(dx)
      this.frameSelectionDiv.height = Math.abs(dy)
      if (dx > 0 && dy > 0) {
        this.frameSelectionDiv.top = this.frameSelectionDiv.startY
        this.frameSelectionDiv.left = this.frameSelectionDiv.startX
      } else if (dx > 0 && dy < 0) {
        this.frameSelectionDiv.top = this.frameSelectionDiv.startY + dy
        this.frameSelectionDiv.left = this.frameSelectionDiv.startX
      } else if (dx < 0 && dy > 0) {
        this.frameSelectionDiv.top = this.frameSelectionDiv.startY
        this.frameSelectionDiv.left = this.frameSelectionDiv.startX + dx
      } else if (dx < 0 && dy < 0) {
        this.frameSelectionDiv.top = this.frameSelectionDiv.startY + dy
        this.frameSelectionDiv.left = this.frameSelectionDiv.startX + dx
      }
      // 判断各个组件是否在方框内
      const _this = this
      const rect = {
        x: this.frameSelectionDiv.left,
        y: this.frameSelectionDiv.top,
        width: this.frameSelectionDiv.width,
        height: this.frameSelectionDiv.height
      }
      const components = this.configData.components
      components.forEach(component => {
        const itemRect = {
          x: component.style.position.x,
          y: component.style.position.y,
          width: component.style.position.w,
          height: component.style.position.h
        }
        if (checkByRectCollisionDetection(rect, itemRect)) {
          _this.addSelectedComponent(component)
        } else {
          _this.removeSelectedComponent(component)
        }
      })
      if (this.selectedComponents.length > 0) {
        this.setLayerSelected(false)
      } else {
        this.setLayerSelected(true)
      }
    },
    onDrop(event) {
      event.preventDefault()
      const infoJson = event.dataTransfer.getData('my-info') || []
      const component = jsonParse(infoJson) || {}
      if (this.checkAddComponent(component) === false) {
        return
      }
      component.style = component.style || {}
      component.style.position = component.style.position || {}
      // 判断当前着陆点是不是layer
      if (event.target.id === 'surface-edit-layer') {
        component.style.position.x = event.offsetX
        component.style.position.y = event.offsetY
      } else {
        // 解决着陆灯不是layer的情形
        const layer = event.currentTarget
        const position = layer.getBoundingClientRect()
        const x = event.clientX - position.left
        const y = event.clientY - position.top
        component.style.position.x = x
        component.style.position.y = y
      }
      // 处理默认值
      this.execute({
        op: 'add',
        component: component
      })
      // 默认选中，并点击
      this.clickItem(component, this.configData.components.length - 1)
    },
    moveItems(direction) {
      let dx = 0
      let dy = 0
      if (direction === 'up') {
        dy = -5
      } else if (direction === 'right') {
        dx = 5
      } else if (direction === 'down') {
        dy = 5
      } else if (direction === 'left') {
        dx = -5
      }
      this.execute({
        op: 'move',
        dx: dx,
        dy: dy,
        items: this.selectedComponentMap
      })
    },
    checkAddComponent(info) {
      if (info === null) {
        this.$q.notify({
          type: 'negative',
          position: 'bottom-right',
          message: 'This component not surpport.'
        })
        return false
      }
      return true
    },
    parseView(component) {
      return topoUtil.parseViewName(component)
    },
    clickItem(component, index) {
      this.setLayerSelected(false)
      if (this.selectedComponentMap[component.identifier] === undefined) {
        this.$emit('set', component)
        this.setSelectedComponent(component)
      } else {
        // 如果已经选中，则不做任何处理
      }
    },
    clickComponent(index, component, event) {
      // 点击组件
      if (event.ctrlKey === true) {
        // 点击了ctrl
        this.setLayerSelected(false)
        if (this.selectedComponentMap[component.identifier] === undefined) {
          this.addSelectedComponent(component)
        } else {
          this.removeSelectedComponent(component)
        }
      } else {
        // 这里不再处理点击事件，改为鼠标左键
        // this.clickItem(component,index);
      }
    },
    upperItem() {
      this.execute({
        op: 'upper',
        items: this.selectedComponent
      })
    },
    downItem() {
      this.execute({
        op: 'down',
        items: this.selectedComponent
      })
    },
    copypasteItem() {
      // 复制和粘贴源
      this.copyItem()
      this.pasteItem()
    },
    copyItem() {
      // 设定复制源
      const items = []
      for (var key in this.selectedComponentMap) {
        const item = deepCopy(this.selectedComponentMap[key])
        items.push(item)
      }
      this.setCopySrcItems(items)
    },
    pasteItem() {
      if (this.copySrcItems && this.copySrcItems.length > 0) {
        this.execute({
          op: 'copy-add',
          items: this.copySrcItems
        })
      }
    },
    removeItem(index, component) {
      // 移除组件
      this.execute({
        op: 'del',
        index: index
      })
      this.setLayerSelected(true)
    },
    fullScreen() {
      localStorage.setItem('topoData', JSON.stringify(this.configData))
      const { href } = this.$router.resolve({
        path: '/fullscreen',
        name: 'TopoFullscreen',
        query: {
          sceneId: this.sceneId,
          sceneName: this.sceneName
        },
        params: {
          sceneId: this.sceneId,
          sceneName: this.sceneName
        }
      })
      window.open(href, '_blank')
    },
    openMenu(e) {
      if (this.selectedIsLayer) {
        return
      }
      // const menuMinWidth = 105
      // const offsetWidth = this.$el.offsetWidth // container width
      // const maxLeft = offsetWidth - menuMinWidth // left boundary
      const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
      const left = e.clientX - offsetLeft + 120 // 15: margin right
      // if (left > maxLeft) {
      //   this.left = maxLeft
      // } else {
      //   this.left = left
      // }
      this.left = left
      this.top = e.clientY - 15
      this.visible = true
      this.selectedTag = this.selectedComponents
    },
    closeMenu() {
      this.visible = false
    },
    printData() {
      const json = JSON.stringify(this.configData)
      console.log(json)
      alert(json)
    },
    onSetEdit(chart) {
      this.$emit('edit', chart)
    },
    onSetSearch(chart) {
      this.$emit('search', chart)
    },
    onDelSearch(chart) {
      const index = this.configData.components.findIndex(arr => arr.identifier === chart.t_id)
      this.removeItem(index)
    },
    onResizeWindow() {
      this.$refs['ruler-tool'].onResizeWindow()
    }
  }
}
</script>

<style lang="scss">
.topo-main {
  width: 100%;
  height: 100%;
  $border-color: #5E72E4FF;
  background-color:  #222831;
  // background-color:  #393E46;
  position: relative;
  overflow-x: hidden;
  overflow-y: hidden;
  $color: #fff;
  $first-color: rgba(57, 62, 70, 1);
  // $second-color: #6D6E6F;
  $second-color: rgba(109, 110, 111, 0.1);
  background-image: linear-gradient(
    45deg,
    $first-color 25%,
    $second-color 25%,
    $second-color 75%,
    $first-color 75%,
    $first-color
  ),
  linear-gradient(
    45deg,
    $first-color 25%,
    $second-color 25%,
    $second-color 75%,
    $first-color 75%,
    $first-color
  );
  background-size: 20px 20px;
  background-position: 0 0, 10px 10px;
  .ScaleBox {
    width: 100%;
    height: 100%;
    .content {
      cursor: unset;
    }
    .topo-layer {
      width: 100%;
      height: 100%;
      position: absolute;
      transform-origin: left top;
      overflow: hidden;
      margin-bottom: 20px;
      cursor: pointer;
      &:before {
        content: '';
        font-size: 21pt;

        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        // opacity: 0.9;s
        background-image: linear-gradient(90deg, rgba(255, 255, 255, 0.1) 10%, rgba(0, 0, 0, 0) 10%), linear-gradient(rgba(255, 255, 255, 0.1) 10%, rgba(0, 0, 0, 0) 10%);
        background-size: 10px 10px;
      }
      .topo-frame-selection {
        background-color: #8787e7;
        opacity: 0.3;
        border: #0000ff solid 1px;
        position: absolute;
        z-index: 999;
      }

      .topo-layer-view {
        position: absolute;
        height: 100px;
        width: 100px;
        background-color: #999;
        cursor: move;
        border: #ccc solid 1px;

        .resize-left-top {
          position: absolute;
          height: 10px;
          width: 10px;
          background-color: white;
          border: 1px solid $border-color;
          left: -5px;
          top: -5px;
          cursor: nwse-resize;
        }

        .resize-left-center {
          position: absolute;
          height: 10px;
          width: 10px;
          background-color: white;
          border: 1px solid $border-color;
          left: -5px;
          top: 50%;
          margin-top: -5px;
          cursor: ew-resize;
        }

        .resize-left-bottom {
          position: absolute;
          height: 10px;
          width: 10px;
          background-color: white;
          border: 1px solid $border-color;
          left: -5px;
          bottom: -5px;
          cursor: nesw-resize;
        }

        .resize-right-top {
          position: absolute;
          height: 10px;
          width: 10px;
          background-color: white;
          border: 1px solid $border-color;
          right: -5px;
          top: -5px;
          cursor: nesw-resize;
        }

        .resize-right-center {
          position: absolute;
          height: 10px;
          width: 10px;
          background-color: white;
          border: 1px solid $border-color;
          right: -5px;
          top: 50%;
          margin-top: -5px;
          cursor: ew-resize;
        }

        .resize-right-bottom {
          position: absolute;
          height: 10px;
          width: 10px;
          background-color: white;
          border: 1px solid $border-color;
          right: -5px;
          bottom: -5px;
          cursor: nwse-resize;
        }

        .resize-center-top {
          position: absolute;
          height: 10px;
          width: 10px;
          background-color: white;
          border: 1px solid $border-color;
          top: -5px;
          left: 50%;
          margin-left: -5px;
          cursor: ns-resize;
        }

        .resize-center-bottom {
          position: absolute;
          height: 10px;
          width: 10px;
          background-color: white;
          border: 1px solid $border-color;
          bottom: -5px;
          left: 50%;
          margin-left: -5px;
          cursor: ns-resize;
        }
      }

      .topo-layer-view-selected {
        outline: 3px dashed $border-color;
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: rgba(34, 40, 49, 1);
    z-index: 3000;
    position: fixed;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: rgba(94, 114, 228, 1);
      }
    }
  }
  .topo-footer {
    position: fixed;
    right: 350px;
    bottom: 58px;
    color: #fff;
    z-index: 1000; // 不可太高,不能高于弹框图层
    .scaling-row {
      display: flex;
      align-items: center;
      .free-scaling {
        // white-space: nowrap;
        padding: 0 8px;
      }
      .el-slider {
        width: 144px;
        .el-slider__runway {
          margin: 0;
          background-color: #c2c3c5;
          .el-slider__bar {
            background-color: #5E72E4FF;
          }
          .el-slider__button-wrapper {
            .el-slider__button {
              background-color: #5E72E4FF;
              border: solid 3px #fff;
            }
          }
        }
      }
    }
  }
}
</style>
