<template>
  <el-form ref="form" class="component_form" :model="form" v-bind="$attrs" v-on="$listeners">
    <el-form-item v-for="(item, index) in formLists" :key="'component_form'+index" :class="item.br?'br':''" v-bind="item">
      <!-- <div slot="content">多行信息<br/>第二行信息</div> -->
      <div v-if="onGetForm(item, form)">
        <el-button v-if="item.type==='button'" v-model="form[item.prop]" v-bind="item.element" />
        <el-radio-group v-else-if="item.type==='radio'" v-model="form[item.prop]" v-bind="item.element">
          <el-radio v-for="(arr, inx) in item.list" :key="arr.label+inx" v-bind="arr">{{ arr.key || arr.label }}</el-radio>
        </el-radio-group>
        <el-radio-group v-else-if="item.type==='radio-button'" v-model="form[item.prop]" v-bind="item.element">
          <el-radio-button v-for="(arr, inx) in item.list" :key="arr.label+inx" v-bind="arr" />
        </el-radio-group>
        <el-checkbox-group v-else-if="item.type==='checkbox'" v-model="form[item.prop]" v-bind="item.element">
          <el-checkbox v-for="(arr, inx) in item.list" :key="arr.label+inx" v-bind="arr" />
        </el-checkbox-group>
        <el-checkbox-group v-else-if="item.type==='checkbox-button'" v-model="form[item.prop]" v-bind="item.element">
          <el-checkbox-button v-for="(arr, inx) in item.list" :key="arr.label+inx" v-bind="arr" />
        </el-checkbox-group>
        <el-input-number v-else-if="item.type==='input-number'" v-model="form[item.prop]" v-bind="item.element" />
        <el-select v-else-if="item.type==='select'" v-model="form[item.prop]" v-bind="item.element" @change="onSelectChange(form[item.prop], item.prop)">
          <el-option v-for="(arr, inx) in item.list" :key="arr.label+inx" v-bind="arr" />
        </el-select>
        <el-cascader v-else-if="item.type==='cascader'" v-model="form[item.prop]" v-bind="item.element" />
        <el-switch v-else-if="item.type==='switch'" v-model.lazy="form[item.prop]" v-bind="item.element" />
        <el-date-picker v-else-if="item.type==='date'" v-model="form[item.prop]" v-bind="item.element" />
        <div v-else-if="item.type==='form'">
          <form-cell :form="form[item.prop]" :form-list="item.data" v-bind="item.attrs" />
        </div>
        <theme-picker v-else-if="item.type==='picker'" :theme-color="form[item.prop]" :element="item.element" @change="themeChange(item.prop, $event)" />
        <el-input v-else-if="item.type==='array'" v-model="form[item.prop]" v-bind="item.element" @change="onSetData(item.prop)" />
        <el-input v-else v-model="form[item.prop]" v-bind="item.element" v-on="item.event" @clear="onClear(item)" />
      </div>
    </el-form-item>
  </el-form>
</template>

<script>
import normalList from './form'
function jsonParse(value) {
  let data
  try {
    data = JSON.parse(value)
  } catch (e) {
    try {
      data = new Function('return ' + value)()
    } catch (e) {
      data = value
    }
  }
  return data
}
export default {
  name: 'FormCell',
  components: {},
  inheritAttrs: false,
  props: {
    form: {
      type: Object,
      default: () => {}
    },
    formList: {
      type: Array,
      default: () => []
    },
    watchStatus: {
      type: String,
      default: () => ''
    }
  },
  data() {
    return {
      formLists: []
    }
  },
  watch: {
    formList: {
      deep: true,
      immediate: true,
      handler(newValue, oldValue) {
        console.log(newValue, oldValue)
        this.formLists = []
        this.formList.forEach(arr => {
          const objTemp = normalList[arr]
          if (objTemp) {
            this.formLists.push(objTemp)
          }
        })
      }
    }
  },
  methods: {
    onGetForm(item, form) {
      if (!form[item.prop] && item.type) {
        if (item.type === 'checkbox' || item.type === 'cascader') {
          form[item.prop] = []
        } else if (item.type === 'switch') {
          if (form[item.prop] === false || form[item.prop] === true || form[item.prop] === undefined) {
            return true
          }
          form[item.prop] = true
        } else if (item.type === 'input-number') {
          form[item.prop] = 0
        } else if (item.type === 'form') {
          form[item.prop] = {}
        } else {
          form[item.prop] = ''
        }
      }
      return true
    },
    onClear(arr) {
      if (arr.clearUndefined) {
        this.form[arr.prop] = undefined
      }
    },
    onSetData(key) {
      if (key === 'centers') {
        this.form['center'] = jsonParse(this.form.centers)
      } else if (key === 'radiuses') {
        this.form.radius = jsonParse(this.form.radiuses)
      } else if (key === 'colors') {
        this.form.color = jsonParse(this.form.colors)
      }
    },
    onSelectChange(type, key) {
      if (key === 'datas') {
        this.form['data'] = jsonParse(this.form.datas)
      }
      if (this.watchStatus === 'true') {
        this.$emit('change', type, key)
      }
    },
    themeChange(type, val) {
      if (val) {
        this.form[type] = val
      }
    },
    validateForm() {
      this.$refs['form'].validate()
    },
    resetForm() {
      this.$refs['form'].resetFields()
    }
  }
}
</script>

<style>
.component_form .br > .el-form-item__content {
  float: left;
  margin-left: 0!important;
}
</style>
<style lang="scss" scoped>
.component_form {
  /deep/ .el-form-item {
    .el-form-item__label {
      color: #333333;
      font-weight: normal;
    }
    &.is-error {
      .el-form-item__content {
        .el-input__inner, .el-form-item.is-error {
          border-color: #F44455;
        }
        // .el-form-item__error {
        //   color: #F44455;
        //   top: 25%;
        //   left:15px;
        // }
        // &:focus {
        //   .el-form-item__error {
        //     display: none;
        //   }
        // }
      }
    }
  }
}
</style>
