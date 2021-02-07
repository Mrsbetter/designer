<template>
  <div class="select-view">
    <el-select v-model="config.__config__.defaultValue">
      <el-option
        v-for="item in config.__slot__.options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>
</template>

<script>
export default {
  props: {
    config: {
      type: Object,
      required: true
    }
  }
}
</script>
