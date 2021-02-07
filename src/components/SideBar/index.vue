<template>
  <div class="sidebar-bg">
    <div class="sidebar-logo">
      <i :class="['el-icon-s-operation', {'active': selectComponent === 'tree'}]" @click="onSelectComponent('tree')" />
      <i :class="['el-icon-menu', {'active': selectComponent === 'component'}]" @click="onSelectComponent('component')" />
      <i :class="['el-icon-coin', {'active': selectComponent === 'datasource'}]" @click="onSelectComponent('datasource')" />
      <i :class="['el-icon-s-help', {'active': selectComponent === 'language'}]" @click="onSelectComponent('language')" />
    </div>
    <div class="sidebar-layout">
      <div v-if="selectComponent==='tree'" class="sidebar-component">
        <div class="sidebar-name">大纲树</div>
        <OutlineTree />
      </div>
      <div v-else-if="selectComponent==='component'" class="sidebar-component">
        <div class="sidebar-name">组件库</div>
        <ComponentLibrary :configs="configs" @set="onSetComponent" @addComponent="addComponent" />
      </div>
      <div v-else-if="selectComponent==='datasource'" class="sidebar-component">
        <div class="sidebar-name">数据库</div>
        <DataSource />
      </div>
      <div v-else-if="selectComponent==='language'" class="sidebar-component">
        <div class="sidebar-name">多语言文案管理</div>
        <LanguageControl />
      </div>
    </div>
  </div>
</template>

<script>
import OutlineTree from './OutlineTree'
import ComponentLibrary from './ComponentLibrary'
import DataSource from './DataSource'
import LanguageControl from './LanguageControl'
export default {
  name: 'SideBar',
  components: {
    OutlineTree,
    ComponentLibrary,
    DataSource,
    LanguageControl
  },
  props: {
    msg: {
      type: String,
      default: 'chart'
    },
    configs: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      selectComponent: 'component'
    }
  },
  mounted() {},
  methods: {
    onSelectComponent(name) {
      this.selectComponent = name
    },
    onSetComponent(info) {
      this.$emit('set', { type: 'setComponent', list: info })
    },
    addComponent(config) {
      this.$emit('addComponent', config)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "~@/styles/variables.scss";
.sidebar-bg {
  width: 100%;
  height: 100%;
  $sidebarWidth: 36px;
  .sidebar-logo {
    border-right: 1px solid $--border-color-lighter;
    float: left;
    width: $sidebarWidth;
    height: 100%;
    padding: 5px;
    font-size: 24px;
    i {
      padding: 10px 0;
    }
    .active {
      color: $menuActiveText;
    }
  }
  .sidebar-layout {
    display: inline-block;
    width: calc(100% - #{$sidebarWidth});
    padding: 5px;
    .sidebar-component {
      .sidebar-name {
        padding-bottom: 5px;
      }
    }
  }
}
</style>
