<!--
 * @Date: 2021/02/02
 * @LastEditors: YanShen
-->
<template>
  <div class="canvas-bg">
    <div v-if="deviceStauts==='mobile'" class="canvas-mobile">
      <div class="mobile-bg">
        <svg class="device-notch" viewBox="0 0 219 31"><path d="M0 1V0h219v1a5 5 0 0 0-5 5v3c0 12.15-9.85 22-22 22H27C14.85 31 5 21.15 5 9V6a5 5 0 0 0-5-5z" fill-rule="evenodd" /></svg>
        <div>canvas</div>
      </div>
    </div>
    <div v-else class="canvas-pc">
      <div class="canvas-content">
        <TopoRender v-if="mode==='view'" ref="topoRender" :list="chartsList" />
        <TopoMain v-else ref="topoMain" class="topo-main" :list="chartsList" />
      </div>
    </div>
  </div>
</template>

<script>
import TopoMain from './topo/TopoMain'
import TopoRender from './topo/TopoRender'
import { mapMutations } from 'vuex'
export default {
  name: 'CanvasBar',
  components: {
    TopoMain,
    TopoRender
  },
  props: {
    msg: {
      type: String,
      default: 'chart'
    },
    mode: {
      required: false,
      type: String,
      default: 'edit'
    }
  },
  data() {
    return {
      deviceStauts: 'mobile',
      chartsList: {}
    }
  },
  mounted() {
    // Store.dispatch('SET_TOPODATA')
  },
  methods: {
    ...mapMutations('topoEditor', [
      'SET_TOPODATA',
      'execute'
    ]),
    changeDevice(device) {
      // 父组件有用到该方法
      this.deviceStauts = device
    },
    addComponent(component) {
      this.execute({
        op: 'add',
        component: component
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "~@/styles/variables.scss";
.canvas-bg {
  width: 100%;
  height: 100%;
  .canvas-mobile {
    height: 100%;
    padding: 5px;
    .mobile-bg {
      margin: 0px auto;
      box-shadow: rgba(2, 8, 20, 0.1) 0px 2px 8px, rgba(2, 8, 20, 0.08) 0px 8px 16px;
      width: 375px;
      height: 100%;
      overflow: hidden;
      position: relative;
      z-index: 1;
      border-radius: 54px;
      border: 12px solid #000;
      .device-notch {
        fill: rgb(9, 10, 13);
        left: 50%;
        position: absolute;
        top: -8px;
        transform: translateX(-50%);
        width: 165px;
        z-index: 2;
      }
    }
  }
  .canvas-pc {
    width: 100%;
    height: 100%;
    .canvas-content {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
