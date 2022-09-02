import { accountStatus } from '@/utils/enums'

// form
export const formData = {
  nickname: '',
  status: '',
  username: ''
}
export const formConfig = [
  {
    type: 'input',
    key: 'nickname',
    width: 160,
    clearable: true,
    placeholder: '请输入姓名'
  },
  {
    type: 'select',
    key: 'status',
    width: 160,
    isEnum: true,
    clearable: true,
    placeholder: '账号状态',
    options: accountStatus
  },
  {
    type: 'input',
    key: 'username',
    width: 160,
    clearable: true,
    placeholder: '请输入账号/手机号'
  },
]

// table
export const tableColumns = [
  { label: '创建时间', prop: 'create_at' },
  { label: '账号', prop: 'username' },
  { label: '姓名', prop: 'nickname' },
  { label: '手机号', prop: 'phone' }
]
