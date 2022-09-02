<template>
  <Form
    ref="formRef"
    :form-config="formConfig"
    :form-data="formData"
    :form-rules="formRules"
    :inline="false"
    label-position="top"
    size="default"
  />
</template>

<script>
import Form from '@/components/Form'
import { vPassword, vUsername } from '@/utils/validateFormRules'

export default {
  components: {
    Form
  },
  data() {
    return {
      loading: false,
      formData: {
        username: '',
        password: ''
      },
      formConfig: [
        { type: 'input', key: 'username', label: '登录账号', placeholder: '请输入登录账号', minlength: 6, maxlength: 20, suffixIcon: '', name: 'loginName' },
        { type: 'input', kind: 'password', key: 'password', label: '登录密码', placeholder: '请输入登录密码', name: 'loginPassword' }
      ],
      formRules: {
        username: [
          { required: true, validator: vUsername, trigger: 'blur' }
        ],
        password: [
          { required: true, validator: vPassword, trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    loading(val) {
      this.formConfig[0].suffixIcon = val ? 'el-icon-loading' : ''
    }
  },
  methods: {
    validate(cb) {
      return this.$refs.formRef.validate(cb)
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .el-form-item__label::before {
  display: none;
}
</style>
