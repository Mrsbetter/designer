
// 选择器
export default {
  __config__: {
    label: '下拉选择',
    showLabel: true,
    tag: 'el-select',
    tagIcon: 'select',
    layout: 'colFormItem',
    changeTag: true,
    document: 'https://element.eleme.cn/#/zh-CN/component/select',
    defaultValue: null
  },
  __slot__: {
    options: [
      {
        label: '选项一',
        value: 1
      },
      {
        label: '选项二',
        value: 2
      }
    ]
  },
  placeholder: '请选择下拉选择',
  style: {
    width: '100%'
  },
  clearable: true,
  disabled: false,
  filterable: false,
  multiple: false,

  component: 'CSelect'
}
