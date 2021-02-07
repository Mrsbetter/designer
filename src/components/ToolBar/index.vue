<template>
  <div class="toolbar-bg">
    <div class="toolbar-logo">
      <img src="./../../assets/logo.png" alt="logo" class="logo_img">
      <span class="logo_text">Nti Web Designer</span>
    </div>
    <div class="toolbar-layout">
      <i :class="['toolbar-items toolbar-device el-icon-monitor', {'pc-node': toolList.device === 'pc'}]" @click="onPc" />
      <i :class="['toolbar-items toolbar-device el-icon-mobile-phone', {'mobile-node': toolList.device === 'mobile'}]" @click="onMobile" />
      <el-link class="toolbar-items" type="primary" :underline="false" @click="onSave">保存</el-link>
      <el-link class="toolbar-items" type="primary" :underline="false" @click="onRun">运行</el-link>
      <el-link class="toolbar-items" type="primary" :underline="false" @click="onExport">导出vue文件</el-link>
      <el-link class="toolbar-items" type="primary" :underline="false" @click="onCopy">复制代码</el-link>
      <el-link class="toolbar-items" type="danger" :underline="false" @click="onClear">清空</el-link>
      <div class="toolbar-items">
        <el-input v-model="searchValue" size="mini" placeholder="请输入内容">
          <i slot="prefix" class="el-input__icon el-icon-search" />
        </el-input>
      </div>
      <i class="toolbar-items el-icon-d-arrow-left" />
      <i class="toolbar-items el-icon-d-arrow-right" />
      <i class="toolbar-items el-icon-time" />
      <el-link class="toolbar-items" :underline="false" @click="onFormSet">表单设置</el-link>
      <el-link class="toolbar-items" :underline="false" @click="onPageSet">页面设置</el-link>
      <el-link class="toolbar-items" :underline="false" @click="onHotkeys">快捷键</el-link>
      <el-link class="toolbar-items" type="info" @click="onHelp">帮助</el-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToolBar',
  props: {
    msg: {
      type: String,
      default: 'chart'
    }
  },
  data() {
    return {
      toolList: {
        device: 'pc'
      },
      searchValue: ''
    }
  },
  mounted() {
    this.onMobile()
  },
  methods: {
    onPc() {
      this.toolList.device = 'pc'
      this.$emit('set', { action: 'pc' })
    },
    onMobile() {
      this.toolList.device = 'mobile'
      this.$emit('set', { action: 'mobile' })
    },
    onSave() {
      this.$emit('set', { action: 'save' })
    },
    onRun() {
      this.$emit('set', { action: 'run' })
    },
    onExport() {
      this.$emit('set', { action: 'export' })
    },
    onCopy() {
      this.$emit('set', { action: 'copy' })
    },
    onClear() {
      this.$emit('set', { action: 'clear' })
    },
    onFormSet() {
      this.$emit('set', { action: 'formset' })
    },
    onPageSet() {
      this.$emit('set', { action: 'pageset' })
    },
    onHotkeys() {
      this.$emit('set', { action: 'hotkeys' })
    },
    onHelp() {
      this.$emit('set', { action: 'help' })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "~@/styles/variables.scss";
.toolbar-bg {
  width: 100%;
  padding: 8px;
  height: 100%;
  .toolbar-logo {
    float: left;
    color: $menuActiveText;
    font-weight: 600;
    font-size: 17px;
    white-space: nowrap;
    height: 100%;
    .logo_img {
      height: 100%;
      padding-right: 5px;
    }
    .logo_text {
      position: absolute;
      top: 12px;
    }
  }
  .toolbar-layout {
    text-align: right;
    .toolbar-items {
      display: inline-block;
      margin-left: 10px;
      max-width: 110px;
    }
    .toolbar-device {
      border-radius: 5px;
      padding: 5px;
      &.pc-node, &.mobile-node {
        background: $--border-color-light;
      }
    }
  }
}
</style>
