<template>
  <div class="component-library-bg">
    <el-input
      v-model="filterText"
      placeholder="输入关键字进行过滤"
      size="mini"
    >
      <i slot="prefix" class="el-input__icon el-icon-search" />
    </el-input>
    <div class="component-library-content">
      <div class="component-library-items">
        <div class="title">最近使用</div>
        <div class="items-content">
          <div v-for="(value, index) in shapeList.items" :key="index+'shape'" class="items" draggable="true" @dragstart="onDragstart($event, value)">
            <div class="element">单行文本</div>
          </div>
          <div class="items">
            <div class="element">多行文本</div>
          </div>
          <div class="items">
            <div class="element">密码</div>
          </div>
        </div>
      </div>
      <div class="component-library-items">
        <div class="title">基础组件</div>
        <div class="items-content">
          <div class="items">
            <div class="element">单行文本</div>
          </div>
          <div class="items">
            <div class="element">多行文本</div>
          </div>
          <div class="items">
            <div class="element">密码</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import jsonBase from './component-library-data/base.json'
import baseModule from './component-library-data/base-module.json'
export default {
  name: 'ComponentLibrary',
  props: {
    msg: {
      type: String,
      default: 'chart'
    }
  },
  data() {
    return {
      filterText: '',
      shapeList: jsonBase,
      moduleBaseList: baseModule
    }
  },
  methods: {
    onDragstart(e, info) {
      this.dragTemp = e || {}
      if (info) {
        let infoJson = ''
        const infoDragTemp = info.info || {}
        infoJson = JSON.stringify(infoDragTemp)
        e.dataTransfer.setData('my-info', infoJson)
        // this.$emit('set', JSON.parse(infoJson))
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "~@/styles/variables.scss";
.component-library-bg {
  width: 100%;
  height: 100%;
  $sidebarWidth: 36px;
  .component-library-content {
    border-top: 1px solid $--border-color-lighter;
    margin-top: 10px;
    .component-library-items {
      clear: both;
      .title {
        font-size: 14px;
        padding: 15px 0 10px 0;
      }
      .items-content {
        width: 100%;
        .items {
          float: left;
          width: 50%;
          padding-bottom: 5px;
          overflow: hidden;
          .element {
            background: $subMenuActiveText;
            border: 1px solid $subMenuActiveText;
            margin-right: 10px;
            font-size: 12px;
            padding: 5px;
            border-radius: 5px;
            &:hover {
              border: 1px dashed $menuActiveText;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
</style>
