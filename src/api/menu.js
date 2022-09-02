import request from '@/utils/request'
import { baseApi } from '@/api/prefix'

// 菜单及权限
export const getMenuPermList = data => request({ url: baseApi('/mock-template/getMenuPermList'), method: 'post', data })
