<template>
  <div class="page-property">
    <el-tabs v-model="activeName" stretch @tab-click="handleClick">
      <el-tab-pane label="页面属性" name="first">用户管理</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'PageProperty',
  props: {
    msg: {
      type: String,
      default: 'chart'
    }
  },
  data() {
    return {
      activeName: 'first',
      activeNames: ['1'],
      formAttributeList: {
        column: 1
      }
    }
  },
  mounted() {},
  methods: {
    handleClick() {
      console.log('dfsdfs')
    },
    handleChange(val) {
      console.log(val)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "~@/styles/variables.scss";
.page-property {
  width: 100%;
  height: 100%;
}
</style>
