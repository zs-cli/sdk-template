<template>
  <el-pagination
    v-if="total > 0"
    :background="background"
    :current-page="currentPage"
    :disabled="disabled"
    :hide-on-single-page="hideOnSinglePage"
    :layout="layout"
    :next-text="nextText"
    :page-size="pageSize"
    :page-sizes="pageSizes"
    :pager-count="pagerCount"
    :prev-text="prevText"
    :small="small"
    :total="total"
    class="pagination"
    @current-change="currentChange"
    @size-change="sizeChange"
  />
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 10
    },
    pagerCount: {
      type: Number,
      default: 7
    },
    currentPage: {
      type: Number,
      default: 1
    },
    background: {
      type: Boolean,
      default: true
    },
    small: Boolean,
    layout: {
      type: String,
      default: 'prev, pager, next, sizes'
    },
    pageSizes: {
      type: Array,
      default: () => ([30, 60, 90, 120])
    },
    hideOnSinglePage: {
      type: Boolean,
      default: false
    },
    disabled: Boolean,
    prevText: {
      type: String,
      default: ''
    },
    nextText: {
      type: String,
      default: ''
    }
  },
  methods: {
    currentChange(val) {
      this.$emit('currentChange', val)
    },
    sizeChange(val) {
      this.$emit('sizeChange', val)
    }
  }
}
</script>

<style lang="less" scoped>
.el-pagination {
  padding: 20px 0;
  text-align: right;
  font-weight: 500;
}

.el-pagination.is-background {
  /deep/ .btn-prev,
  /deep/ .btn-next,
  /deep/ .el-pager li {
    background-color: #fff;
    border: 1px solid #d5d9de;
    border-radius: 2px;
  }
  /deep/ .el-pager li:not(.disabled).active  {
    background-color: #066CF1;
    border-color: #066CF1
  }
}
</style>
