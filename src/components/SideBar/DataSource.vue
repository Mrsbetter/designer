<template>
  <div class="component-library-bg">
    <el-input
      v-model="filterText"
      placeholder="输入关键字进行过滤"
      size="mini"
    >
      <i slot="prefix" class="el-input__icon el-icon-search" />
    </el-input>
    <div class="component-library-content" />
  </div>
</template>

<script>
export default {
  name: 'DataSource',
  props: {
    msg: {
      type: String,
      default: 'chart'
    }
  },
  data() {
    return {
      filterText: ''
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
    .component-library-items {
      .title {
        font-size: 16px;
      }
      .items-content {
        width: 100%;
        .items {
          float: left;
          width: 50%;
        }
      }
    }
  }
}
</style>
