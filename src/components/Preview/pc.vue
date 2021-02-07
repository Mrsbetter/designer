<template>
  <div class="pc-preview">
    <el-row>
      <el-form>
        <div class="board">
          <el-col v-for="item in components" :key="item.__vModel__" class="board__item">
            <component :is="item.component" :config="item" />
          </el-col>
        </div>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import { previews } from './components'
console.log(previews)
// console.log()
export default {
  components: previews,
  props: {
    components: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped lang="scss">

.pc-preview {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}
</style>
