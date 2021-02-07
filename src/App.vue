<template>
  <div id="app" class="design-bg">
    <div class="design-toolbar">
      <ToolBar ref="_toolbar" @set="onSetToolBar" />
    </div>
    <div class="design-layout">
      <div class="design-left design-ft">
        <SideBar ref="_sidebar" @set="onSetSideBar" />
      </div>
      <div :class="['design-center design-ft', {'hidden-active': hiddenStatus}]">
        <div class="design-canvas">
          <CanvasBar ref="_canvasbar" :list="cavasList" @set="onSetCanvasBar" />
        </div>
        <div class="design-hidden">
          <HiddenBar ref="_hiddenbar" @set="onSetHiddenBar" />
        </div>
      </div>
      <div class="design-right design-ft">
        <PropertyBar ref="_propertybar" type="conponent" @set="onSetPropertyBar" />
      </div>
    </div>
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->

  </div>
</template>

<script>
import ToolBar from './components/ToolBar/index'
import SideBar from './components/SideBar/index'
import CanvasBar from './components/CanvasBar/index'
import HiddenBar from './components/HiddenBar/index'
import PropertyBar from './components/PropertyBar/index'

export default {
  name: 'App',
  components: {
    ToolBar,
    SideBar,
    CanvasBar,
    HiddenBar,
    PropertyBar
  },
  data() {
    return {
      hiddenStatus: false,
      cavasList: {}
    }
  },
  mounted() {},
  methods: {
    onSetToolBar(toolObj) {
      if (toolObj.action === 'pc') {
        this.$refs['_canvasbar'].changeDevice('pc')
        console.log('pc')
      } else if (toolObj.action === 'mobile') {
        this.$refs['_canvasbar'].changeDevice('mobile')
        console.log('mobile')
      } else if (toolObj.action === 'save') {
        console.log('save')
      } else if (toolObj.action === 'run') {
        console.log('run')
      } else if (toolObj.action === 'export') {
        console.log('export')
      } else if (toolObj.action === 'copy') {
        console.log('copy')
      } else if (toolObj.action === 'clear') {
        console.log('clear')
      } else if (toolObj.action === 'formset') {
        this.$refs['_propertybar'].handleType('formset')
        console.log('formset')
      } else if (toolObj.action === 'pageset') {
        this.$refs['_propertybar'].handleType('pageset')
        console.log('pageset')
      } else if (toolObj.action === 'hotkeys') {
        console.log('hotkeys')
      } else if (toolObj.action === 'help') {
        console.log('help')
      }
    },
    onSetSideBar(sideObj) {
      console.log('sdfdsf', sideObj)
      if (sideObj.type === 'setComponent') {
        this.$refs['_canvasbar'].addComponent(sideObj.list)
      }
    },
    onSetCanvasBar(canvasObj) {
      console.log('sdfdsf', canvasObj)
    },
    onSetHiddenBar(hiddenObj) {
      console.log('sdfdsf', hiddenObj)
    },
    onSetPropertyBar(propertyObj) {
      console.log('sdfdsf', propertyObj)
    }
  }
}
</script>

<style lang="scss">
@import "~@/styles/variables.scss";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.design-bg {
  width: 100%;
  $toolbarHeight: 45px;
  .design-toolbar {
    height: $toolbarHeight;
    border-bottom: 1px solid $--border-color-lighter;
  }
  .design-layout {
    height: calc(100% - #{$toolbarHeight});
    .design-ft {
      height: 100%;
      float: left;
    }
    .design-left {
      width:22%;
      border-right: 1px solid $--border-color-lighter;
    }
    .design-center {
      width: 56%;
      $hiddenHeight: 150px;
      .design-canvas {
        height: 100%;
      }
      .design-hidden {
        display: none;
      }
      &.hidden-active {
        .design-canvas {
          height: calc(100% - #{$hiddenHeight});
        }
        .design-hidden {
          display: block;
          height: $hiddenHeight;
          border-top: 1px solid $--border-color-lighter;
        }
      }
    }
    .design-right {
      width: 22%;
      border-left: 1px solid $--border-color-lighter;
    }
  }
}
</style>
