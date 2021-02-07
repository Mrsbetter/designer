<template>
  <div class="sidebar-bg">
    <div class="sidebar-mobile">
      <div>dd</div>
    </div>
    <div class="sidebar-pc">
      <div>组件库</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HiddenBar',
  props: {
    msg: {
      type: String,
      default: 'chart'
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
    display: inline-block;
    width: $sidebarWidth;
    padding: 5px;
  }
  .sidebar-layout {
    display: inline-block;
    width: calc(100% - #{$sidebarWidth});
    text-align: right;
  }
}
</style>
