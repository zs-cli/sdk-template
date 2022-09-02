<template>
  <Form
    ref="formRef"
    :form-config="formConfig"
    :form-data="formData"
    :form-rules="formRules"
    :inline="false"
    label-position="top"
    size="default"
  >
    <!-- VerificationCode 手机验证码 -->
    <template #vCode="{ data, config }">
      <VerificationCode :maxlength="config.maxlength" :phone="data.phone" @input="inputHandle" />
    </template>
  </Form>
</template>

<script>
import Form from '@/components/Form'
import VerificationCode from '@/components/VerificationCode'
import { vPhone } from '@/utils/validateFormRules'

export default {
  components: {
    Form,
    VerificationCode
  },
  data() {
    return {
      formData: {
        phone: '',
        code: ''
      },
      formConfig: [
        { type: 'input', key: 'phone', kind: 'int', label: '手机号', maxlength: 11, placeholder: '请输入手机号' },
        { type: 'vCode', key: 'code', kind: 'int', label: '验证码', slotName: 'vCode', maxlength: 6, placeholder: '请输入验证码' }
      ],
      formRules: {
        phone: [
          { required: true, validator: vPhone, trigger: 'blur' },
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
        ]
      }
    }
  },
  methods: {
    validate(cb) {
      return this.$refs.formRef.validate(cb)
    },
    inputHandle(val) {
      this.formData.code = val
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .el-form-item__label::before {
  display: none;
}
</style>
