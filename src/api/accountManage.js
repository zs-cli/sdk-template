import request from '@/utils/request'
import { baseApi } from '@/api/prefix'

// 账号列表
export const getAccountList = (params) => request({ url: baseApi('/mock-template/list'), method: 'get', params })
