/*
 * Created by YanShen on 2019/08/01
 * Modified by: YanShen on 2019/08/09
 */
// import TableExpand from './expand'

export default {
  name: 'FormCell',
  functional: true,
  // compoments: { TableExpand },
  props: {
    column: {
      type: Object,
      default: () => { }
    }
  },
  render: (h, ctx) => {
    const props = ctx.props.column
    if (props.type === 'html') {
      return (
        <el-form-item {...{
          props: props,
          scopedSlots: {
            default: scope => {
              return (
                <div
                  { ...{
                    domProps: { innerHTML: scope.row[props.prop] }
                  }}
                />
              )
            }
          }
        }} />
      )
    } else {
      return (
        <el-form-item
          {...{
            props: props,
            scopedSlots: {
              default: scope => {
                return (
                  <div>34343423</div>
                )
              }
            }
          }}
        />
      )
    }
  }
}
