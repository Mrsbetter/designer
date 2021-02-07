/*
 * Created by YanShen on 2021/02/01
 * Modified by: YanShen on 2021/02/02
 */
//

export default {
  component_type: {
    prop: 'component_type',
    label: '组件类型',
    element: {
      clearable: true
    },
    rules: [
      { required: true, message: '请输入看板名称', trigger: 'change' },
      { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
    ]
  },
  field_name: {
    prop: 'field_name',
    label: '字段名',
    element: {
      type: 'textarea',
      rows: 5,
      placeholder: '请输入看板描述'
    }
  },
  title: {
    prop: 'title',
    label: '标题',
    element: {
      size: 'mini'
    }
  },
  prompt: {
    prop: 'prompt',
    label: '提示语',
    element: {
      size: 'mini'
    }
  },
  form_grid: {
    prop: 'form_grid',
    label: '表单栅格',
    element: {
      type: 'slider',
      size: 'mini'
    }
  },
  label_width: {
    prop: 'label_width',
    label: '标签宽度',
    element: {
      size: 'mini'
    }
  },
  component_width: {
    prop: 'component_width',
    label: '组件宽度',
    element: {
      size: 'mini'
    }
  },
  default_values: {
    prop: 'default_values',
    label: '默认值',
    element: {
      type: 'textarea',
      rows: 5,
      size: 'mini'
    }
  },
  format: {
    prop: 'format',
    label: '格式',
    element: {
      type: 'select',
      size: 'mini'
    }
  },
  prefix: {
    prop: 'prefix',
    label: '前缀',
    element: {
      size: 'mini'
    }
  },
  suffix: {
    prop: 'suffix',
    label: '后缀',
    element: {
      size: 'mini'
    }
  }
}
