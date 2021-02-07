<template>
  <div
    class="view-search select-new"
    :style="{
      fontSize: detail.style.fontSize + 'px',
      fontFamily: detail.style.fontFamily,
      color: detail.style.foreColor,
      textAlign: textAlign,
      lineHeight: lineHeight + 'px',
    }"
  >
    <div v-if="editMode" slot="header" class="operation-search-bar">
      <i v-show="searchList.searchList&&getJson(searchList.searchList).length>0" class="el-icon-edit" @click="handleEdit(searchList)" />
      <i v-show="searchList.searchList&&getJson(searchList.searchList).length===0" class="el-icon-plus" @click="handleEdit(searchList)" />
      <i class="el-icon-delete" @click="handleDelete(searchList)" />
    </div>
    <!-- {{ detail.style.text }} -->
    <div class="block-time">
      <div v-for="(arr, index) in getJson(searchList.searchList)" :key="`${searchList.t_id}${arr.t_id}${index}`">
        <div class="name"><span v-if="arr.condition.require">*</span>{{ arr.name || '未命名' }}</div>
        <div v-if="arr.condition.showType==='date'">
          <div v-if="arr.condition && arr.condition.filterType==='single'" class="normal-value">
            <el-date-picker
              v-model="arr.condition.defaultTimes"
              :type="arr.condition.timeGranule"
              value-format="yyyy-MM-dd"
              popper-class="select-picker"
              size="mini"
              placeholder="请选择日期"
            />
          </div>
          <div v-else-if="arr.condition" class="normal-value">
            <div v-if="arr.condition.intervalType !== '结束于'">
              <span v-if="arr.condition.intervalType === '开始于'" class="demonstration">开始于</span>
              <el-date-picker
                v-model="arr.condition.startTimes"
                :type="arr.condition.timeGranule"
                :picker-options="pickerOptions('startTime', arr.condition)"
                value-format="yyyy-MM-dd"
                popper-class="select-picker"
                size="mini"
                placeholder="请选择日期"
              />
            </div>
            <span v-if="arr.condition.intervalType === '时间区间'" class="time-gap">-</span>
            <div v-if="arr.condition.intervalType !== '开始于'">
              <span v-if="arr.condition.intervalType === '结束于'" class="demonstration">结束于</span>
              <el-date-picker
                v-model="arr.condition.endTimes"
                :type="arr.condition.timeGranule"
                :picker-options="pickerOptions('endTimes', arr.condition)"
                value-format="yyyy-MM-dd"
                popper-class="select-picker"
                size="mini"
                placeholder="请选择日期"
              />
            </div>
          </div>
        </div>
        <div v-else-if="arr.condition.showType==='select'">
          <div class="normal-value">
            <el-select v-if="arr.condition.searchType==='single'" v-model="arr.condition.defaultSearchs" class="condition-select" popper-class="collapse-select" size="small" placeholder="请选择" clearable>
              <el-option
                v-for="search in arr.defaultSelectList||[]"
                :key="search"
                :label="search"
                :value="search"
              />
            </el-select>
            <el-select v-else v-model="arr.condition.defaultMultiples" class="condition-select" popper-class="collapse-select" multiple collapse-tags size="small" placeholder="请选择" clearable>
              <el-option
                v-for="search in arr.defaultSelectList||[]"
                :key="search"
                :label="search"
                :value="search"
              />
            </el-select>
          </div>
        </div>
        <div v-else class="condition-type">
          <div class="condition-value">
            <el-select v-model="arr.condition.conditionValues.first" class="condition-select" popper-class="collapse-select" size="mini" placeholder="请选择" clearable>
              <el-option
                v-for="search in conditionSelectList[arr.condition.showType]"
                :key="search.value"
                :label="search.label"
                :value="search.value"
              />
            </el-select>
            <el-input v-if="arr.condition.conditionValues.first==='为空'||arr.condition.conditionValues.first==='不为空'" :disabled="arr.condition.conditionValues.first==='为空'||arr.condition.conditionValues.first==='不为空'" size="mini" placeholder="" />
            <el-input v-else v-model="arr.condition.conditionValues.firstValue" size="mini" placeholder="请输入内容" clearable />
          </div>
          <div v-if="arr.condition.conditionValues.conditionType!=='single'" class="condition-bind">{{ arr.condition.conditionValues.conditionType==='or'?'或':'且' }}</div>
          <div v-if="arr.condition.conditionValues.conditionType!=='single'" class="condition-value">
            <el-select v-model="arr.condition.conditionValues.second" class="condition-select" popper-class="collapse-select" size="mini" placeholder="请选择" clearable>
              <el-option
                v-for="search in conditionSelectList[arr.condition.showType]"
                :key="search.value"
                :label="search.label"
                :value="search.value"
              />
            </el-select>
            <el-input v-if="arr.condition.conditionValues.second==='为空'||arr.condition.conditionValues.second==='不为空'" :disabled="arr.condition.conditionValues.second==='为空'||arr.condition.conditionValues.second==='不为空'" size="mini" placeholder="" />
            <el-input v-else v-model="arr.condition.conditionValues.secondValue" size="mini" placeholder="请输入内容" clearable />
          </div>
        </div>
      </div>
      <div v-if="searchList.searchList&&getJson(searchList.searchList).length===0" class="no-data">
        <span>Tips:当前无查询条件</span>
        <!-- <img src="../../../../assets/img/btn_add.png" @click="handleEdit(searchList)"> -->
      </div>
      <div v-else class="search-btn">
        <el-button type="primary" size="mini" @click="handleSearch(searchList)">查询</el-button>
      </div>
    </div>
  </div>
</template>

<script>

import BaseView from '../View'
import { jsonParse } from './../../libs/common'

export default {
  name: 'ViewSearch',
  components: {},
  extends: BaseView,
  props: {

  },
  data() {
    return {
      searchList: {},
      conditionSelectList: {
        'string': [
          {
            value: '等于',
            label: '等于'
          }, {
            value: '不等于',
            label: '不等于'
          }, {
            value: '包含',
            label: '包含'
          }, {
            value: '不包含',
            label: '不包含'
          }, {
            value: '开头是',
            label: '开头是'
          }, {
            value: '结尾是',
            label: '结尾是'
          }, {
            value: '为空',
            label: '为空'
          }, {
            value: '不为空',
            label: '不为空'
          }
        ],
        'number': [
          {
            value: '等于',
            label: '等于'
          }, {
            value: '不等于',
            label: '不等于'
          }, {
            value: '大于',
            label: '大于'
          }, {
            value: '大于等于',
            label: '大于等于'
          }, {
            value: '小于',
            label: '小于'
          }, {
            value: '小于等于',
            label: '小于等于'
          }
        ]
      }
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
        this.searchList = value.detail
      }
    }
  },
  methods: {
    getJson(str) {
      console.log(jsonParse(str), 'board-dashboardItem-getJson')
      return jsonParse(str) || []
    },
    pickerOptions(type, condition) {
      if (condition.intervalType === '时间区间') {
        const endTimeTemp = condition.endTimes
        const startTimeTemp = condition.startTimes
        const endTime = endTimeTemp ? new Date(endTimeTemp) : ''
        const startTime = startTimeTemp ? new Date(startTimeTemp) : ''
        if (type === 'startTime') {
          return {
            disabledDate(time) {
              if (endTime) {
                return time.getTime() > endTime
              } else {
                return !time.getTime()
              }
            }
          }
        } else {
          return {
            disabledDate(time) {
              if (startTime) {
                return time.getTime() < startTime
              } else {
                return !time.getTime()
              }
            }
          }
        }
      } else {
        this.pickerOptionList = [{}, {}]
      }
    },
    handleEdit(chart) {
      this.$emit('edit', chart)
    },
    handleSearch(chart) {
      this.$emit('search', chart)
    },
    handleDelete(chart) {
      this.$emit('delete', chart)
    }
  }
}
</script>

<style lang="scss">
@import "~@/styles/mixin.scss";
// .collapse-select {
//   @include selectCollapse;
// }
// .select-picker {
//   @include selectPicker;
// }
.view-search {
  padding: 0!important;
  // height: calc(100% - 35px)!important;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  /*滚动条样式and新的组件样式*/
  @include scrollBar;
  // @include selectNew;
  &:hover {
    .operation-search-bar {
      display: block;
    }
  }
  .operation-search-bar {
    display: none;
    height: 25px;
    line-height: 0;
    position: absolute;
    top: -12px;
    color: #fff;
    background: #409EFF;
    right: 0;
    .el-icon-edit, .el-icon-plus {
      padding: 5px 0 5px 10px;
      &::after {
        content: '|';
        padding-left: 10px;
      }
    }
    .el-icon-delete {
      padding: 5px 10px 5px 5px;
    }
    i {
      cursor: pointer;
    }
  }
  .block-time {
    line-height: 1;
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    .no-data {
      // font-size: 14px;
      display: flex;
      justify-content: center;
      align-items: center;
      min-width: 160px;
      flex: 1;
      padding-top: 8px;
      img {
        background: #409EFF;
        margin-left: 10px;
        width: 25px;
        cursor: pointer;
      }
    }
    & > div {
      padding-right: 5px;
    }
    .name {
      padding: 10px 0 2px 0;
      text-align: left;
      span {
        color: red;
      }
    }
    .condition-type {
      display: flex;
      align-items: center;
      .condition-bind {
        padding: 0 6px;
      }
      .condition-value {
        display: flex;
        line-height: 0;
        .el-select {
          margin-right: 5px;
          .el-input {
            width: 88px;
          }
        }
        .el-input {
          width: 120px;
        }
      }
    }
    .normal-value {
      display: flex;
      line-height: 0;
      & > div {
        display: flex;
        align-items: center;
        background: #F9FAFD;
        border-radius: 4px;
        .demonstration {
          padding-left: 5px;
          font-size: 13px;
          &::after {
            content: '|';
            padding-left: 5px;
            color: #ddd;
          }
        }
      }
      .el-date-editor {
        width: 100%;
        max-width: 145px;
        min-width: 130px;
        .el-input__inner {
          background: #F9FAFD;
          border: none;
        }
      }
      .time-gap {
        padding: 8px;
      }
    }
    .search-btn {
      display: flex;
      align-items: flex-end;
      justify-items: center;
      padding-top: 8px;
    }
  }
  .no-chart {
    background: #fff;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    flex-wrap: wrap;
    height: calc(100% - 42px);
    width: calc(100% - 4px);
    position: absolute;
    top: 40px;
    left: 2px;
    overflow: hidden;
    img {
      max-width: 100%;
      height: calc(100% - 80px);
    }
    & > div {
      padding-top: 10px;
      width: 100%;
      text-align: center;
      font-size: 11px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
