<template>
  <el-table
    ref="tableRef"
    v-loading="loading"
    :border="border"
    :cell-class-name="cellClassName"
    :cell-style="cellStyle"
    :data="tableData"
    :empty-text="emptyText"
    :height="height"
    :highlight-current-row="highlightCurrentRow"
    :row-class-name="rowClassName"
    :row-key="rowKey"
    :show-summary="showSummary"
    :size="'default'"
    :span-method="spanMethod"
    :stripe="stripe"
    :sum-text="sumText"
    :summary-method="summaryMethod ? (param) => summaryMethod(param) : null"
    style="width: 100%"
    @current-change="currentChange"
    @select="select"
    @select-all="selectAll"
    @selection-change="selectionChange"
    @sort-change="sortChange"
  >
    <!-- 自定义数据为空时显示 -->
    <template slot="empty">
      <slot name="empty" />
    </template>
    <!-- table-column -->
    <!-- type index -->
    <el-table-column v-if="index" label="序号" type="index" width="55" />
    <!-- type selection -->
    <el-table-column
      v-if="selection"
      :reserve-selection="reserveSelection"
      :selectable="(row, index) => selectable(row, index)"
      type="selection"
      width="50"
    />
    <!-- column -->
    <TableColumns v-for="(item, itemIndex) in tableColumns" :key="item.prop || itemIndex" :item="item">
      <template v-if="item.customHeader" #[item.customHeader]="{ column }">
        <slot
          :column="column"
          :name="item.customHeader"
        />
      </template>
      <template v-if="item.slotName" #[item.slotName]="{ row, column, $index }">
        <slot
          :$index="$index"
          :column="column"
          :name="item.slotName"
          :row="row"
        />
      </template>
    </TableColumns>
    <!-- append 最后一行之后的内容 -->
    <template slot="append">
      <slot name="append" />
    </template>
  </el-table>
</template>

<script>
/**
 * props 包含element已有和自定义参数
 * 自定义参数
 */
import TableColumns from './column.vue'

export default {
  components: {
    TableColumns
  },
  props: {
    loading: Boolean,
    height: {
      type: [String, Number],
      default: undefined
    },
    maxHeight: {
      type: [String, Number],
      default: undefined
    },
    stripe: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: false
    },
    showSummary: Boolean,
    sumText: {
      type: String,
      default: ''
    },
    rowClassName: {
      type: Function,
      default: () => ''
    },
    cellClassName: {
      type: Function,
      default: () => ''
    },
    summaryMethod: {
      type: [Function, Boolean],
      default: false
    },
    spanMethod: {
      type: Function,
      default: () => { }
    },
    cellStyle: {
      type: Function,
      default: () => { }
    },
    tableData: {
      type: Array,
      default: () => ([])
    },
    tableColumns: {
      type: Array,
      default: () => ([])
    },
    highlightCurrentRow: Boolean,
    emptyText: {
      type: String,
      default: '暂无数据'
    },
    reserveSelection: {
      type: Boolean,
      default: true
    },
    selectable: {
      type: Function,
      default: () => true
    },
    rowKey: {
      type: String,
      default: 'id'
    },
    // 自定义
    index: Boolean,
    selection: Boolean
  },
  methods: {
    /** 单选 */
    // 单选-当前选中
    currentChange(currentRow, oldCurrentRow) {
      this.$emit('currentChange', { currentRow, oldCurrentRow })
    },
    // 单选-设置选中
    setCurrentRow(row) {
      this.$refs.tableRef.setCurrentRow(row)
    },
    /** selection */
    // 勾选 selection
    select(selection, row) {
      this.$emit('selectHandle', { selection, row })
    },
    // 全选 selection
    selectAll(selection) {
      this.$emit('selectAll', selection)
    },
    // selection 选项发生变化
    selectionChange(selection) {
      this.$emit('selectionChange', selection)
    },
    // selection 自定义选项
    toggleRowSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.tableRef.toggleRowSelection(row)
        })
      } else {
        this.$refs.tableRef.clearSelection()
      }
    },
    // 清除 selection
    clearSelection() {
      this.$refs.tableRef.clearSelection()
    },
    /** 排序 sort */
    sortChange({ column, prop, order }) {
      this.$emit('sortChange', { column, prop, order })
    },
    // 取消排序
    clearSort() {
      this.$refs.tableRef.clearSort()
    }
  }
}
</script>
