<template>
  <div class="app-container account-list">
    <Card title="账号列表">
      <template slot="headerRight">
        <div class="header-right">
          <Form
            ref="formRef"
            class="card-form"
            :loading="loading"
            :form-config="formConfig"
            :form-data="formData"
            type="search"
            @searchFormHandle="searchFormHandle"
            @resetFormHandle="resetFormHandle"
          />
        </div>
      </template>
      <Table
        ref="tableRef"
        :loading="loading"
        :table-columns="tableColumns"
        :table-data="list"
      />
      <Pagination
        :current-page="pagination.page_number"
        :page-size="pagination.page_size"
        :total="pagination.total"
        @currentChange="(val) => currentChange(val, false)"
        @sizeChange="(val) => sizeChange(val, false)"
      />
    </Card>
  </div>
</template>

<script>
import Card from '@/components/Card'
import Form from '@/components/Form'
import Table from '@/components/Table'
import Pagination from '@/components/Pagination'
import { formData, formConfig, tableColumns } from './config'
import { cloneDeep } from 'lodash'
import { accountStatus } from '@/utils/enums'
import { excludeEmpty } from '@/utils/helper'
import { getAccountList } from '@/api/accountManage'
import mixinTable from '@/mixins/mixinTable'
import { mapGetters } from 'vuex'

export default {
  components: {
    Card,
    Form,
    Table,
    Pagination
  },
  mixins: [mixinTable],
  data() {
    return {
      loading: false,
      statusLoading: false,
      formData: cloneDeep(formData),
      formConfig: cloneDeep(formConfig),
      tableColumns,
      // enums
      accountStatus,
    }
  },
  computed: {
    ...mapGetters(['permission', 'userInfo']),
    editPermission() {
      return this.permission.includes('PERMISSION:ACCOUNTMANAGE:ACCOUNTLIST:EDIT')
    },
  },
  created() {
    this.getTableData()
  },
  methods: {
    clickAddAccount() {
      this.$router.push({ name: 'accountAdd' })
    },
    clickEdit(row) {
      if (row.id === 1 || row.id === this.userInfo.id || !this.editPermission) return
      this.$router.push({ name: 'accountEdit', params: { id: row.id }})
    },
    searchFormHandle() {
      this.getTableData()
    },
    resetFormHandle() {
      this.$refs.formRef.resetFields()
      this.getTableData()
    },
    async getTableData() {
      const params = excludeEmpty(this.formData)
      try {
        this.loading = true
        const res = await getAccountList(params)
        const { data } = res
        this.tableData = data || []
        this.pagination.total = data.length
      } catch (res) {
        this.tableData = []
      }
      this.loading = false
    },
  }
}
</script>

<style lang="less" scoped>
.header-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .card-form {
    display: flex;
    justify-content: flex-end;
  }
  .header-right--button {
    height: 30px;
    margin-left: 8px;
  }
}

.switch--value {
  margin-left: 8px;
  color: #31363F;
}
.account--edit {
  font-size: 14px;
  color: #066CF1;
  &.is-disabled {
    color: #C0C4CC;
  }
}
</style>
