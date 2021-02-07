<template>
  <div
    ref="TableView"
    class="view-table"
    :style="{
      '--headerBg': tableStyle.headerBg,
      '--textBg': tableStyle.textBg,
      '--textColor': tableStyle.textColor,
      '--borderWidth': tableStyle.borderWidth,
      '--borderStyle': tableStyle.borderStyle,
      '--borderColor': tableStyle.borderColor,
      '--oddLineBg': tableStyle.oddLineBg,
      '--evenLineBg': tableStyle.evenLineBg
    }"
  >
    <el-table id="tableWrapper" ref="tableWrapper" :data="tableData" :height="tableBox.h">
      <el-table-column
        v-for="arr in xData"
        :key="arr.key"
        :prop="arr.key"
        :label="arr.label"
      />
    </el-table>
  </div>
</template>

<script>
import BaseView from '../View'
import { jsonParse } from './../../libs/common'
export default {
  name: 'ViewTable',
  extends: BaseView,
  props: {},
  data() {
    return {
      tableData: [],
      xData: [],
      bindData: [],
      tableStyle: {},
      tableBox: {}
    }
  },
  watch: {
    'detail': {
      deep: true,
      immediate: true,
      handler(value) {
        if (!value) {
          return
        }
        const styleTemp = value.style || {}
        this.tableStyle = styleTemp.tableStyle || {
          headerBg: 'rgba(17, 205, 239, 0.8)',
          textBg: 'rgba(17, 205, 239, 0.4)',
          textColor: 'rgba(255, 255, 255, 0.7)',
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: 'rgba(17, 205, 239, 1)',
          oddLineBg: 'rgba(17, 205, 239, 0)',
          evenLineBg: 'rgba(17, 205, 239, 0)'
        }
        this.tableBox = styleTemp.position || {}
        const newVal = value.detail || {}
        const newValue = jsonParse(newVal.data_json || {})
        console.log(value, newValue, 'viewTable')
        this.xData = []
        this.tableData = []
        this.bindData = newValue.bind ? (newValue.bind.dsx || []) : []
        if (newValue.xAxis && newValue.xAxis.data) {
          const xData = newValue.xAxis.data || []
          xData.forEach((arr, index) => {
            this.xData.push({
              key: ('key' + index),
              label: arr || ''
            })
          })
        }
        if (newValue.series && newValue.series.length > 0) {
          newValue.series.forEach((arr, index) => {
            this.tableData[index] = {}
            const xData = arr.data || []
            xData.forEach((item, seq) => {
              const keys = ('key' + seq)
              this.tableData[index][keys] = item || 0
            })
          })
        }
      }
    }
  },
  methods: {}
}
</script>

<style lang="scss">
@import "~@/styles/mixin.scss";
.view-table {
  height: 100%;
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: top;
  border: none;
  $headerBg: var(--headerBg);
  $textBg: var(--textBg);
  $textColor:  var(--textColor);
  $borderWidth: var(--borderWidth)px;
  $borderStyle: var(--borderStyle);
  $borderColor: var(--borderColor);
  $oddLineBg: var(--oddLineBg);
  $evenLineBg: var(--oddLineBg);
  // $headerBg: rgba(17, 205, 239, 0.8);
  // $borderColor: rgba(17, 205, 239, 1);
  // $textBg: rgba(17, 205, 239, 0.4);
  // $textColor:  rgba(255, 255, 255, 0.7);
  $fontSize: 14px;
  .el-table {
    height: 100%;
    width: 100%;
    background: transparent;
    &::before {
      background: transparent;
    }
    /deep/ .el-table__header-wrapper {
      .el-table__header tr {
        & > th {
          background: $headerBg;
          color: $textColor;
          border: none;
          font-size: $fontSize;
          font-weight: 400;
          text-align: center;
          & + th {
            border-left-color: $borderColor;
            border-left-style: $borderStyle;
            border-left-width: $borderWidth;
          }
        }
      }
    }
    /deep/ .el-table__body-wrapper {
      /*滚动条样式*/
      @include scrollBar;
      .el-table__body {
        border-bottom: 1px solid $textBg;
      }
      tr.el-table__row:nth-child(2n + 1) {
        // 奇数行
        background: $oddLineBg;
        color: $textColor;
        & > td {
          border: none;
          font-size: $fontSize;
          font-weight: 400;
          text-align: center;
          & + td {
            border-left-color: $borderColor;
            border-left-style: $borderStyle;
            border-left-width: $borderWidth;
          }
        }
        &:hover > td {
          background: unset;
        }
      }
      tr.el-table__row:nth-child(2n) {
        // 偶数行
        background: $evenLineBg;
        color: $textColor;
        & > td {
          border: none;
          font-size: $fontSize;
          font-weight: 400;
          text-align: center;
          & + td {
            border-left-color: $borderColor;
            border-left-style: $borderStyle;
            border-left-width: $borderWidth;
          }
        }
        &:hover > td {
          background: unset;
        }
      }
    }
  }
}
</style>
