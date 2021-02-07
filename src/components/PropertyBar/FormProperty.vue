<template>
  <div class="form-property">
    <el-tabs v-model="activeName" stretch @tab-click="handleClick">
      <el-tab-pane label="表单属性" name="first">
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item title="PC端设置" name="1">
            <div class="attribute-item">
              <div class="name">列数</div>
              <div class="content">
                <el-radio-group v-model="formAttributeList.column" size="mini">
                  <el-radio-button label="1">1列</el-radio-button>
                  <el-radio-button label="2">2列</el-radio-button>
                </el-radio-group>
              </div>
            </div>
          </el-collapse-item>
          <el-collapse-item title="表单效验" name="2">
            <div class="attribute-item">
              <div class="name">公式效验</div>
              <div class="content">
                <el-button type="primary" size="mini">添加公式</el-button>
              </div>
            </div>
          </el-collapse-item>
          <el-collapse-item title="表单事件" name="3">
            <div class="attribute-item">
              <div class="name">公式执行</div>
              <div class="content">
                <el-button type="primary" size="mini">添加业务关联规则</el-button>
              </div>
            </div>
          </el-collapse-item>
          <el-collapse-item title="高级" name="4">
            <div class="attribute-item">
              <div class="name">表单数据源</div>
              <div class="content">
                <el-button type="primary" size="mini">编辑代码</el-button>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'FormProperty',
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
.form-property {
  width: 100%;
  height: 100%;
  /deep/.el-collapse {
    .el-collapse-item {
      .el-collapse-item__content {
        .attribute-item {
          .name {
            float: left;
            width: 30%;
            text-align: right;
          }
          .content {
            float: left;
            padding-left: 15px;
          }
        }
      }
    }
  }
}
</style>
