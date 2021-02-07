<template>
  <div class="outline-tree-bg">
    <el-input
      v-model="filterText"
      placeholder="输入关键字进行过滤"
      size="mini"
    >
      <i slot="prefix" class="el-input__icon el-icon-search" />
    </el-input>

    <el-tree
      ref="tree"
      class="filter-tree"
      :data="dataList"
      :props="defaultProps"
      default-expand-all
      draggable
      :allow-drop="allowDrop"
      :allow-drag="allowDrag"
      :filter-node-method="filterNode"
      @node-drag-start="handleDragStart"
      @node-drag-enter="handleDragEnter"
      @node-drag-leave="handleDragLeave"
      @node-drag-over="handleDragOver"
      @node-drag-end="handleDragEnd"
      @node-drop="handleDrop"
    >
      <span slot-scope="{ node, data }" :class="['custom-tree-node', {'hidden-node': data.name === 'hidden'}]">
        <i :class="['el-icon-view', 'icon-eye', {'eye-node': data.name === 'show'}]" />
        <i :class="['active', data.icon]" />
        <span>{{ node.label }}</span>
      </span>
    </el-tree>
  </div>
</template>

<script>
export default {
  name: 'OutlineTree',
  props: {
    msg: {
      type: String,
      default: 'chart'
    }
  },
  data() {
    return {
      filterText: '',
      dataList: [{
        id: 1,
        icon: 'el-icon-camera',
        label: '前台',
        children: [{
          id: 4,
          icon: 'el-icon-bell',
          name: 'hidden',
          label: 'API'
        }, {
          id: 9,
          icon: 'el-icon-edit',
          name: 'hidden',
          label: 'Button'
        }, {
          id: 10,
          icon: 'el-icon-edit-outline',
          name: 'show',
          label: '应用系统'
        }]
      }, {
        id: 2,
        label: '后台',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    handleDragStart(node, ev) {
      console.log('drag start', node)
      console.log(ev)
    },
    handleDragEnter(draggingNode, dropNode, ev) {
      console.log('tree drag enter: ', dropNode.label)
      console.log(draggingNode, ev)
    },
    handleDragLeave(draggingNode, dropNode, ev) {
      console.log('tree drag leave: ', dropNode.label)
      console.log(draggingNode, ev)
    },
    handleDragOver(draggingNode, dropNode, ev) {
      console.log('tree drag over: ', dropNode.label)
      console.log(draggingNode, ev)
    },
    handleDragEnd(draggingNode, dropNode, dropType, ev) {
      console.log('tree drag end: ', dropNode && dropNode.label, dropType)
      console.log(draggingNode, ev)
    },
    handleDrop(draggingNode, dropNode, dropType, ev) {
      console.log('tree drop: ', dropNode.label, dropType)
      console.log(draggingNode, ev)
    },
    allowDrop(draggingNode, dropNode, type) {
      console.log('allowDrop', draggingNode)
      if (dropNode.data.label === '二级 3-1') {
        return type !== 'inner'
      } else {
        return true
      }
    },
    allowDrag(draggingNode) {
      return draggingNode.data.label.indexOf('三级 3-2-2') === -1
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "~@/styles/variables.scss";
.outline-tree-bg {
  width: 100%;
  height: 100%;
  $sidebarWidth: 36px;
  /deep/ .filter-tree {
    font-size: 12px;
    padding-top: 5px;
    .el-tree-node__content {
      height: unset;
      .custom-tree-node {
        color: $menuBg;
        .icon-eye {
          display: none;
          margin-left: -28px;
          padding-right: 16px;
          // position: absolute;
          // margin-left: -20px;
          // left: 0px;
        }
        .eye-node {
          display: inline-block;
        }
        i {
          font-size: 14px;
          padding-right: 5px;
        }
        &.hidden-node {
          .icon-eye {
            display: none;
          }
          i {
            color: $menuActiveText;
          }
        }
      }
    }
  }
}
</style>
