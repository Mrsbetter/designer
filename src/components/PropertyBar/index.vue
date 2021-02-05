<template>
  <div class="propertybar-bg">
    <div v-if="propertyType==='formset'" class="property-layout form-attribute">
      <FormProperty />
    </div>
    <div v-else-if="propertyType==='pageset'" class="property-layout page-attribute">
      <PageProperty />
    </div>
    <div v-else-if="propertyType.includes('conponent')" class="property-layout component-attribute">
      <ComponentProperty />
    </div>
  </div>
</template>

<script>
import FormProperty from './FormProperty'
import PageProperty from './PageProperty'
import ComponentProperty from './ComponentProperty'
export default {
  name: 'PropertyBar',
  components: {
    FormProperty,
    PageProperty,
    ComponentProperty
  },
  props: {
    type: {
      type: String,
      default: 'chart'
    }
  },
  data() {
    return {
      propertyType: '',
      activeName: 'first',
      activeNames: ['1'],
      formAttributeList: {
        column: 1
      }
    }
  },
  mounted() {},
  methods: {
    handleType(type) {
      this.propertyType = type
    },
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
.propertybar-bg {
  width: 100%;
  height: 100%;
  .property-layout {
    height: 100%;
  }
}
</style>
