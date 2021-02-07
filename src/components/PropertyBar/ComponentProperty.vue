<template>
  <div class="component-property">
    <el-tabs v-model="activeName" stretch @tab-click="handleClick">
      <el-tab-pane label="组件属性" name="attribute">
        <user-form :form="form" :form-list="formList" label-width="80px" />
      </el-tab-pane>
      <el-tab-pane label="组件高级" name="advance">
        <user-form :form="form" :form-list="formList" label-width="80px" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import UserForm from './Form/index'
export default {
  name: 'ComponentProperty',
  components: {
    UserForm
  },
  props: {
    msg: {
      type: String,
      default: 'chart'
    }
  },
  data() {
    return {
      form: {},
      normalList: {
        attribute: ['component_type', 'field_name', 'title', 'prompt',
          'form_grid', 'label_width', 'component_width', 'default_values',
          'format', 'prefix', 'suffix'],
        advance: ['field_name', 'title', 'prompt',
          'form_grid', 'label_width', 'suffix']
      },
      formList: [],
      activeName: 'attribute'
    }
  },
  mounted() {
    this.formList = [...this.normalList.attribute] || []
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
      this.activeName = tab.name
      if (tab.name === 'attribute') {
        this.formList = [...this.normalList.attribute] || []
      } else {
        this.formList = [...this.normalList.advance] || []
      }
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
@import "~@/styles/mixin.scss";
.component-property {
  width: 100%;
  height: 100%;
  /deep/ .el-tabs {
    height: 100%;
    .el-tabs__header {
      margin: 0;
    }
    .el-tabs__content {
      padding: 5px;
      height: calc(100% - 40px);
      @include scrollBar;
    }
  }
}
</style>
