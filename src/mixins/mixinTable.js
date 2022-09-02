/**
 * mixin 适用 table 、pagination
 */

export default {
  data() {
    return {
      tableData: [],
      pagination: {
        total: 0,
        page_number: 1,
        page_size: 30
      },
      timer: null
    }
  },
  computed: {
    // 用于前端分页
    list() {
      const { pagination: { page_number, page_size }} = this
      const list = this.tableData.slice((page_number - 1) * page_size, page_number * page_size)
      return list
    }
  },
  methods: {
    // 分页
    currentChange(val, type = true) {
      this.pagination.page_number = val
      if (type === true) {
        this.getTableData()
      }
    },
    // size改变  type表示后端分页合前端分页
    sizeChange(val, type = true) {
      this.pagination.page_size = val
      this.pagination.page_number = 1
      if (type === true) {
        this._deferRequest()
      }
    },
    // 防抖 fix：size改变会触发分页bug
    _deferRequest() {
      this.timer && clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.getTableData()
      }, 0)
    }
  },
  beforeDestroy() {
    this.timer && clearTimeout(this.timer)
  }
}
