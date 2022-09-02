import request from '@/utils/request'
import { baseApi } from '@/api/prefix'

// 登录
export const login = data => request({ url: baseApi('/mock-template/login'), method: 'post', data })
// 手机号登录
export const phoneLogin = data => request({ url: baseApi('/mock-template/loginPhone'), method: 'get', data })
// 获取用户信息
export const getInfo = data => request({ url: baseApi('/mock-template/getInfo'), method: 'post', data })
// 退出
export const logout = () => request({ url: baseApi('/common/login/logout'), method: 'post' })
// 发送短信
export const sendSms = data => request({ url: baseApi('/common/login/getLoginSms'), method: 'post', data })
